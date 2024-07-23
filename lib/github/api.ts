import { Octokit } from "@octokit/rest";

// Initialize Octokit with environment variable
const octokit = new Octokit({
  auth: process.env.GITHUB_PAT
});

export async function fetchGitHubOrganizations(): Promise<any[]> {
  try {
    // Fetch organizations for the authenticated user
    const { data: organizations } = await octokit.orgs.listForAuthenticatedUser();
    return organizations;
  } catch (error) {
    console.error("Error fetching GitHub organizations:", error);
    throw new Error("Failed to fetch GitHub organizations");
  }
}

export async function fetchUserGitHubAccount(): Promise<any> {
  try {
    // Fetch the authenticated user's account details
    const { data: user } = await octokit.users.getAuthenticated()
    return {
      id: user.id,
      login: user.login
    }
  } catch (error) {
    console.error("Error fetching GitHub user account:", error)
    throw new Error("Failed to fetch GitHub user account")
  }
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
