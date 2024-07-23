import { getWorkspaceById } from "@/db/queries/workspaces-queries"
import { getProjectsByWorkspaceId } from "@/db/queries/projects-queries"
import { getGitHubClient } from "@/actions/auth/auth"

export const revalidate = 0

export default async function WorkspacePage({
  params
}: {
  params: { workspaceId: string }
}) {
  const github = await getGitHubClient()
  const { workspaceId } = params

  const workspace = await getWorkspaceById(workspaceId, github.auth())
  const projects = await getProjectsByWorkspaceId(workspaceId, github.auth())

  if (!workspace) {
    return <div>Workspace not found</div>
  }

  return (
    <div>
      <h1>{workspace.githubOrgName}</h1>
      <h2>Projects:</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  )
}
