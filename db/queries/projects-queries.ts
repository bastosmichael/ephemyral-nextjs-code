"use server"

import { getUserId } from "@/actions/auth/auth"
import { and, desc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "../db"
import {
  InsertProject,
  SelectProject,
  projectsTable
} from "../schema/projects-schema"
import { createGitHubRepository } from "@/lib/github/api"
import { getWorkspaceById } from "./workspaces-queries"

export async function createProject(
  data: Omit<InsertProject, "userId">
): Promise<SelectProject> {
  const userId = await getUserId()

  try {
    const workspace = await getWorkspaceById(data.workspaceId)
    if (!workspace) {
      throw new Error("Workspace not found")
    }

    // Assume we have the GitHub access token stored securely and can retrieve it
    const githubAccessToken = await getGitHubAccessToken(userId)

    const repo = await createGitHubRepository(
      workspace.githubOrganizationId!,
      data.name,
      githubAccessToken
    )

    const [result] = await db
      .insert(projectsTable)
      .values({
        ...data,
        userId,
        githubRepoFullName: repo.full_name,
      })
      .returning()
    revalidatePath("/")
    return result
  } catch (error) {
    console.error("Error creating project record:", error)
    throw error
  }
}

export async function getProjectById(
  id: string
): Promise<SelectProject | undefined> {
  try {
    return await db.query.projects.findFirst({
      where: eq(projectsTable.id, id)
    })
  } catch (error) {
    console.error(`Error getting project by id ${id}:`, error)
    throw error
  }
}

export async function getProjectsByUserId(): Promise<SelectProject[]> {
  const userId = await getUserId()

  try {
    return db.query.projects.findMany({
      where: eq(projectsTable.userId, userId),
      orderBy: desc(projectsTable.updatedAt)
    })
  } catch (error) {
    console.error("Error getting projects for user:", error)
    throw error
  }
}

export async function getProjectsByWorkspaceId(
  workspaceId: string
): Promise<SelectProject[]> {
  return db.query.projects.findMany({
    where: eq(projectsTable.workspaceId, workspaceId),
    orderBy: desc(projectsTable.updatedAt)
  })
}

export async function getAllProjects(): Promise<SelectProject[]> {
  return db.query.projects.findMany({
    orderBy: desc(projectsTable.updatedAt)
  })
}

export async function updateProject(
  id: string,
  data: Partial<InsertProject>
): Promise<void> {
  try {
    await db
      .update(projectsTable)
      .set(data)
      .where(and(eq(projectsTable.id, id)))
    revalidatePath("/")
  } catch (error) {
    console.error(`Error updating project ${id}:`, error)
    throw error
  }
}

export async function getMostRecentIssueWithinProjects(
  workspaceId: string
): Promise<{ projectId: string } | undefined> {
  const result = await db
    .select({
      projectId: projectsTable.id
    })
    .from(issuesTable)
    .innerJoin(projectsTable, eq(issuesTable.projectId, projectsTable.id))
    .where(eq(projectsTable.workspaceId, workspaceId))
    .orderBy(desc(issuesTable.updatedAt))
    .limit(1)

  return result[0] ? { projectId: result[0].projectId } : undefined
}

export async function deleteProject(id: string): Promise<void> {
  try {
    await db.delete(projectsTable).where(and(eq(projectsTable.id, id)))
    revalidatePath("/")
  } catch (error) {
    console.error(`Error deleting project ${id}:`, error)
    throw error
  }
}

async function getGitHubAccessToken(userId: string): Promise<string> {
  // Implement this function to retrieve the stored GitHub access token for the user
  // This might involve querying a separate table in your database that stores user tokens
  // For now, we'll just throw an error
  throw new Error("getGitHubAccessToken not implemented")
}
