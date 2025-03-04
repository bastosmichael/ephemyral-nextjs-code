"use server"

import { getAuthenticatedOctokit } from "./auth"

export const listBranches = async (
  installationId: number | null,
  repoFullName: string
): Promise<string[]> => {
  try {
    const octokit = await getAuthenticatedOctokit(installationId)
    const [owner, repo] = repoFullName.split("/")
    let page = 1
    const allBranches: string[] = []

    while (true) {
      const { data } = await octokit.repos.listBranches({
        owner,
        repo,
        per_page: 100,
        page
      })

      if (!data || data.length === 0) {
        break
      }

      allBranches.push(...data.map(branch => branch.name))
      page += 1
    }

    return allBranches
  } catch (error: any) {
    console.error("Error fetching branches:", error)
    return []
  }
}
