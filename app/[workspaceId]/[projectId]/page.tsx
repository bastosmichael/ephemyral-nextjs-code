import { getProjectById } from "@/db/queries/projects-queries"
import { getGitHubClient } from "@/actions/auth/auth"

export const revalidate = 0

export default async function ProjectPage({
  params
}: {
  params: { projectId: string; workspaceId: string }
}) {
  const github = await getGitHubClient()
  const { projectId } = params

  const project = await getProjectById(projectId, github.auth())

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="text-2xl font-semibold">{project.name}</div>
      <div>GitHub Repository: {project.githubRepoName}</div>
      <div>Default Branch: {project.githubDefaultBranch}</div>
    </div>
  )
}
