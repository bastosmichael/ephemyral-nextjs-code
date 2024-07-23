import { Octokit } from "@octokit/rest"
import { getAuthenticatedOctokit } from "@/actions/github/auth"

export async function fetchUserOrganizations(installationId: number | null) {
  const octokit = await getAuthenticatedOctokit(installationId)
  const { data: orgs } = await octokit.orgs.listForAuthenticatedUser()
  return orgs
}

export async function getOrganizationDetails(orgName: string, installationId: number | null) {
  const octokit = await getAuthenticatedOctokit(installationId)
  const { data: org } = await octokit.orgs.get({ org: orgName })
  return org
}

export async function listOrganizationRepositories(orgName: string, installationId: number | null) {
  const octokit = await getAuthenticatedOctokit(installationId)
  const { data: repos } = await octokit.repos.listForOrg({ org: orgName })
  return repos
}

export async function createRepositoryInOrganization(orgName: string, repoName: string, installationId: number | null) {
  const octokit = await getAuthenticatedOctokit(installationId)
  const { data: repo } = await octokit.repos.createInOrg({
    org: orgName,
    name: repoName,
    private: true,
  })
  return repo
}
