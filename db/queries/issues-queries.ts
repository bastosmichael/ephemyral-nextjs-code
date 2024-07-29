"use server"

import { getUserId } from "@/actions/auth/auth"
import { and, desc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "../db"
import {
  InsertIssue,
  SelectIssue,
  issuesTable,
  projectsTable
} from "../schema/issues-schema"

export async function createIssue(
  data: Omit<InsertIssue, "userId">
): Promise<SelectIssue> {
  const userId = await getUserId()

  const [issue] = await db
    .insert(issuesTable)
    .values({ ...data, userId })
    .returning()
  revalidatePath("/")
  await updateProjectUpdatedAt(data.projectId)
  return issue
}

export async function getIssuesByProjectId(
  projectId: string
): Promise<SelectIssue[]> {
  return db.query.issues.findMany({
    where: and(eq(issuesTable.projectId, projectId)),
    orderBy: desc(issuesTable.createdAt)
  })
}

export async function getIssueById(
  id: string
): Promise<SelectIssue | undefined> {
  return db.query.issues.findFirst({
    where: eq(issuesTable.id, id)
  })
}

export async function updateIssue(
  id: string,
  data: Partial<InsertIssue>
): Promise<SelectIssue> {
  const updateQuery = db
    .update(issuesTable)
    .set(data)
    .where(eq(issuesTable.id, id))

  if (Object.keys(data).length === 0) {
    throw new Error("No fields provided to update")
  }

  const [updatedIssue] = await updateQuery.returning()
  revalidatePath("/")
  if (updatedIssue) {
    await updateProjectUpdatedAt(updatedIssue.projectId)
  }
  return updatedIssue
}

export async function deleteIssue(id: string): Promise<void> {
  const issue = await getIssueById(id)
  if (!issue) {
    throw new Error(`Issue with id ${id} not found`)
  }
  await db.delete(issuesTable).where(eq(issuesTable.id, id))
  revalidatePath("/")
  await updateProjectUpdatedAt(issue.projectId)
}

async function updateProjectUpdatedAt(projectId: string): Promise<void> {
  try {
    await db
      .update(projectsTable)
      .set({ updatedAt: new Date() })
      .where(eq(projectsTable.id, projectId))
  } catch (error) {
    console.error(`Error updating project ${projectId}:`, error)
    throw error
  }
}
