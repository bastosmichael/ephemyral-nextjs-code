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

// ... (rest of the file remains unchanged)

async function getGitHubAccessToken(userId: string): Promise<string> {
  // Implement this function to retrieve the stored GitHub access token for the user
  // This might involve querying a separate table in your database that stores user tokens
  // For now, we'll just throw an error
  throw new Error("getGitHubAccessToken not implemented")
}
