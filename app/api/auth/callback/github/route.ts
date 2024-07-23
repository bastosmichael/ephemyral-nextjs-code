import {
  fetchGitHubOrganizations
} from "@/lib/github/api"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")

  if (!code) {
    return new Response("Missing code", { status: 400 })
  }

  try {
    const organizations = await fetchGitHubOrganizations()

    // Store the access token and organizations in the session
    const session = { organizations }

    // Create a session cookie (for demonstration, consider using a more secure approach in production)
    const sessionCookie = Buffer.from(JSON.stringify(session)).toString(
      "base64"
    )

    const headers = new Headers()
    headers.append(
      "Set-Cookie",
      `session=${sessionCookie}; Path=/; HttpOnly; Secure; SameSite=Strict`
    )
    headers.append("Location", "/select-organization")

    return new Response(null, { status: 302, headers })
  } catch (error: any) {
    console.error("Error in GitHub callback:", error)
    return new Response("Error during GitHub authentication", { status: 500 })
  }
}
