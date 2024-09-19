"use server"

import { GitHubRepository } from "@/src/types/github"
import { getAuthenticatedOctokit } from "./auth"

export const listRepos = async (
  installationId: number | null,
  organizationId: string | null,
  fetchCount: number = 15 // Default to fetching 10 repositories
): Promise<GitHubRepository[]> => {
  try {
    const octokit = await getAuthenticatedOctokit(installationId)
    let repositories: any[] = []
    let page = 1
    const per_page = 100 // Max allowed by GitHub API

    while (true) {
      let response: any

      if (installationId) {
        response = await octokit.apps.listReposAccessibleToInstallation({
          per_page,
          page
        })
        repositories = repositories.concat(response.data.repositories)
      } else {
        response = await octokit.request("GET /user/repos", {
          per_page,
          page
        })
        repositories = repositories.concat(response.data)
      }

      if (response.data.length < per_page) break
      page++
    }

    // Filter repositories by organization ID
    if (organizationId) {
      repositories = repositories.filter(
        repo => repo.owner && repo.owner.login === organizationId
      )
    }

    // Sort by updated_at and take the top 'fetchCount' most recently updated
    repositories.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
    repositories = repositories.slice(0, fetchCount)

    return repositories
      .map(repo => ({
        description: repo.description,
        full_name: repo.full_name,
        html_url: repo.html_url,
        id: repo.id,
        name: repo.name,
        private: repo.private
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  } catch (error: any) {
    throw new Error(error)
  }
}
