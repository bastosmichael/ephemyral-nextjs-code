"use server"

import { getUserId } from "@/actions/auth/auth"
import { fetchUserOrganizations, getOrganizationDetails } from "@/services/github-api"
import { revalidatePath } from "next/cache"
import { db } from "../db"
import { InsertWorkspace, SelectWorkspace, workspacesTable } from "../schema/workspaces-schema"
import { eq } from "drizzle-orm"

export async function associateWorkspace(
  githubOrgId: string,
  githubOrgName: string
): Promise<SelectWorkspace> {
  const userId = await getUserId()

  try {
    const [result] = await db
      .insert(workspacesTable)
      .values({ userId, githubOrgId, githubOrgName })
      .returning()
    revalidatePath("/")
    return result
  } catch (error) {
    console.error("Error associating workspace:", error)
    throw error
  }
}

export async function getWorkspaceById(
  id: string,
  installationId: number | null
): Promise<SelectWorkspace | undefined> {
  try {
    const workspace = await db.query.workspaces.findFirst({
      where: eq(workspacesTable.id, id)
    })

    if (workspace) {
      const orgDetails = await getOrganizationDetails(workspace.githubOrgName, installationId)
      return { ...workspace, ...orgDetails }
    }

    return undefined
  } catch (error) {
    console.error(`Error getting workspace by id ${id}:`, error)
    throw error
  }
}

export async function getWorkspacesByUserId(installationId: number | null): Promise<SelectWorkspace[]> {
  const userId = await getUserId()

  try {
    const userOrgs = await fetchUserOrganizations(installationId)
    const workspaces = await db.query.workspaces.findMany({
      where: eq(workspacesTable.userId, userId)
    })

    return workspaces.map(workspace => {
      const matchingOrg = userOrgs.find(org => org.id.toString() === workspace.githubOrgId)
      return { ...workspace, ...matchingOrg }
    })
  } catch (error) {
    console.error("Error getting workspaces for user:", error)
    throw error
  }
}
