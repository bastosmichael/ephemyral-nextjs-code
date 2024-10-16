"use client"

import { deleteIssue } from "@/db/queries/issues-queries"
import { SelectIssue } from "@/db/schema/issues-schema"
import { DataItem } from "../dashboard/reusable/data-item"
import { DataList } from "../dashboard/reusable/data-list"
import { Button } from "@/components/ui/button" // Import Button for Llama option

interface IssuesListProps {
  issues: SelectIssue[]
}

export function IssuesList({ issues }: IssuesListProps) {
  const handleIssueDelete = async (id: string) => {
    await deleteIssue(id)
  }

  const generateWithLlama = async () => {
    try {
      // Logic to trigger generation with Llama
      const response = await someLlamaAPI.generateIssues();
      // Handle the response (updating state, notifying user, etc.)
    } catch (error) {
      console.error("Error generating with Llama:", error);
      // Optionally provide user feedback
    }
  }

  return (
    <DataList
      title="Issues"
      subtitle="Manage issues"
      readMoreLink="https://docs.ephemyral-code.ai/core-components/issues"
      readMoreText="Read more"
      createLink={`./issues/create`}
      createText="Create issue"
      dataListTitle="Issues"
    >
      <Button onClick={generateWithLlama} variant="outline" className="mt-4">
        Generate with Llama
      </Button>
      {issues.length > 0 ? (
        issues.map(issue => (
          <DataItem
            key={issue.id}
            data={{ id: issue.id, name: issue.name }}
            type="issues"
            onDelete={handleIssueDelete}
          />
        ))
      ) : (
        <div>No issues found.</div>
      )}
    </DataList>
  )
}
