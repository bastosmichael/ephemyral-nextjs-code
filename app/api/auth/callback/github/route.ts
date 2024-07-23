import { associateWorkspace } from "@/db/queries/workspaces-queries"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const installationId = parseInt(searchParams.get("installation_id")!)
  const state = searchParams.get("state")

  if (!installationId || !state) {
    return new Response(
      JSON.stringify({ error: "Missing installation ID or state" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" }
      }
    )
  }

  const { workspaceId } = JSON.parse(decodeURIComponent(state))

  try {
    const github = await getGitHubClient()
    const installation = await github.apps.getInstallation({ installation_id: installationId })
    
    if (installation.data.account) {
      await associateWorkspace(
        installation.data.account.id.toString(),
        installation.data.account.login
      )
    }

    revalidatePath(`/`)
  } catch (error: any) {
    console.error("Error in GitHub callback:", error)
  }

  return redirect(`/${workspaceId}`)
}
