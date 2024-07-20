import { getTemplatesWithInstructionsByProjectId } from "@/db/queries/templates-queries"
import { NewIssueForm } from "./new-issue-form"

export const IssueCreation = async ({ projectId }: { projectId: string }) => {
  const templates = await getTemplatesWithInstructionsByProjectId(projectId)
  const defaultTemplate = { id: "", name: "", content: "" }

  return <NewIssueForm templates={templates} defaultTemplate={defaultTemplate} />
}
