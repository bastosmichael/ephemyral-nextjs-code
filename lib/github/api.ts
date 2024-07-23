import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

export async function fetchGitHubOrganizations(accessToken: string) {
  octokit.auth({ type: 'oauth', token: accessToken });
  const { data: organizations } = await octokit.orgs.listForAuthenticatedUser();
  return organizations;
}

export async function getGitHubAccessToken(code: string) {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await response.json();
  return data.access_token;
}

export async function createGitHubRepository(orgId: string, name: string, accessToken: string) {
  octokit.auth({ type: 'oauth', token: accessToken });
  const { data: repo } = await octokit.repos.createInOrg({
    org: orgId,
    name,
    private: true,
  });
  return repo;
}
