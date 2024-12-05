import { updateWorkspace } from "@/db/queries"
import { LinearClient } from "@linear/sdk"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")

  // Validate the presence of required parameters
  if (!code || !state) {
    return new Response(JSON.stringify({ error: "Invalid OAuth callback" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    })
  }

  // Validate environment variables
  if (
    !process.env.NEXT_PUBLIC_LINEAR_CLIENT_ID ||
    !process.env.LINEAR_CLIENT_SECRET
  ) {
    console.error("Missing Linear OAuth environment variables")
    return new Response(JSON.stringify({ error: "Server misconfiguration" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }

  try {
    // Resolve headers as it is an asynchronous function
    const headersList = await headers()
    const host = headersList.get("host") || ""
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https"
    const origin = `${protocol}://${host}`

    // Decode and parse the state parameter
    const { workspaceId } = JSON.parse(decodeURIComponent(state))

    // Exchange the authorization code for an access token
    const tokenResponse = await fetch("https://api.linear.app/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        redirect_uri: `${origin}/api/auth/callback/linear`,
        client_id: process.env.NEXT_PUBLIC_LINEAR_CLIENT_ID!,
        client_secret: process.env.LINEAR_CLIENT_SECRET!,
        grant_type: "authorization_code"
      })
    })

    // Handle token response errors
    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error("Linear token exchange error:", errorData)
      return new Response(
        JSON.stringify({
          error: `Failed to exchange code for token: ${tokenResponse.statusText}`
        }),
        {
          status: tokenResponse.status,
          headers: { "Content-Type": "application/json" }
        }
      )
    }

    // Parse the access token from the response
    const { access_token } = await tokenResponse.json()

    // Initialize Linear client with the access token
    const linearClient = new LinearClient({ apiKey: access_token })
    const organization = await linearClient.organization

    // Update workspace with Linear organization details and access token
    await updateWorkspace(workspaceId, {
      linearOrganizationId: organization.id,
      linearAccessToken: access_token
    })

    // Revalidate the homepage or other required paths
    revalidatePath(`/`)

    // Redirect the user to the workspace settings page
    return redirect(`/${workspaceId}/settings`)
  } catch (error) {
    console.error("Error during Linear OAuth:", error)
    return new Response(
      JSON.stringify({ error: "Failed to complete Linear OAuth process" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    )
  }
}
