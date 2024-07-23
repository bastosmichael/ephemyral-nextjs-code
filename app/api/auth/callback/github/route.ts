import { getGitHubAccessToken, fetchGitHubOrganizations } from "@/lib/github/api"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")

  if (!code) {
    return new Response("Missing code", { status: 400 })
  }

  try {
    const accessToken = await getGitHubAccessToken(code)
    const organizations = await fetchGitHubOrganizations(accessToken)

    // Store the access token and organizations in the session
    // This is a simplified example. In a real app, you'd want to use a proper session management solution.
    const session = { accessToken, organizations }
    
    // In a real app, you'd set this session data securely, possibly using encrypted cookies or a server-side session store
    const sessionCookie = Buffer.from(JSON.stringify(session)).toString('base64')
    
    const headers = new Headers()
    headers.append('Set-Cookie', `session=${sessionCookie}; Path=/; HttpOnly; Secure; SameSite=Strict`)

    return redirect("/select-organization", { headers })
  } catch (error: any) {
    console.error("Error in GitHub callback:", error)
    return new Response("Error during GitHub authentication", { status: 500 })
  }
}
