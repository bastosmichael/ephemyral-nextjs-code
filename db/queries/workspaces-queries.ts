"use server"

import { getUserId } from "@/actions/auth/auth"
import { and, desc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "../db"
import {
  InsertWorkspace,
  SelectWorkspace,
  workspacesTable
} from "../schema/workspaces-schema"
import { fetchGitHubOrganizations, fetchUserGitHubAccount } from "@/app/api/auth/callback/github/api"

export async function createWorkspaces(
  data: Omit<
    InsertWorkspace,
    "userId" | "githubOrganizationId" | "githubOrganizationName"
  >
): Promise<InsertWorkspace[]> {
  const userId = await getUserId()

  try {
    // Fetch organizations and user account
    const [organizations, userAccount] = await Promise.all([
      fetchGitHubOrganizations(),
      fetchUserGitHubAccount() // You need to implement this function
    ])

    // Combine the user's account with the organizations list
    const allEntities = [...organizations, userAccount]

    // Create an array to hold all workspace insertions
    const workspaceInsertions = allEntities.map(async entity => {
      return db
        .insert(workspacesTable)
        .values({
          name: `${entity.login}`,
          userId,
          githubOrganizationId: entity.id,
          githubOrganizationName: entity.login
        })
        .returning()
    })

    // Execute all insertions in parallel and get results
    const results = await Promise.all(workspaceInsertions)

    revalidatePath("/")

    // Flatten the array of results
    return results.flat()
  } catch (error) {
    console.error("Error creating workspace records:", error)
    throw error
  }
}

export async function createWorkspace(
  data: Omit<InsertWorkspace, "userId">
): Promise<SelectWorkspace> {
  const userId = await getUserId()

  try {
    const [result] = await db
      .insert(workspacesTable)
      .values({ ...data, userId })
      .returning()
    revalidatePath("/")
    return result
  } catch (error) {
    console.error("Error creating workspace record:", error)
    throw error
  }
}

export async function getWorkspaceById(
  id: string
): Promise<SelectWorkspace | undefined> {
  try {
    return await db.query.workspaces.findFirst({
      where: eq(workspacesTable.id, id)
    })
  } catch (error) {
    console.error(`Error getting workspace by id ${id}:`, error)
    throw error
  }
}

export async function getWorkspacesByUserId(): Promise<SelectWorkspace[]> {
  const userId = await getUserId()

  try {
    return await db.query.workspaces.findMany({
      where: eq(workspacesTable.userId, userId),
      orderBy: desc(workspacesTable.createdAt)
    })
  } catch (error) {
    console.error("Error getting all workspaces:", error)
    throw error
  }
}

export async function getWorkspaceByLinearOrganizationId(
  linearOrganizationId: string
): Promise<SelectWorkspace | undefined> {
  return db.query.workspaces.findFirst({
    where: eq(workspacesTable.linearOrganizationId, linearOrganizationId)
  })
}

export async function updateWorkspace(
  id: string,
  data: Partial<InsertWorkspace>
): Promise<void> {
  try {
    await db
      .update(workspacesTable)
      .set(data)
      .where(and(eq(workspacesTable.id, id)))
    revalidatePath("/")
  } catch (error) {
    console.error(`Error updating workspace ${id}:`, error)
    throw error
  }
}

export async function deleteWorkspace(id: string): Promise<void> {
  try {
    await db.delete(workspacesTable).where(and(eq(workspacesTable.id, id)))
    revalidatePath("/")
  } catch (error) {
    console.error(`Error deleting workspace ${id}:`, error)
    throw error
  }
}
