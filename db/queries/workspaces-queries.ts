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
import { fetchGitHubOrganizations, getGitHubAccessToken } from "@/lib/github/api"

export async function createWorkspace(
  data: Omit<InsertWorkspace, "userId" | "githubOrganizationId" | "githubOrganizationName">
): Promise<SelectWorkspace> {
  const userId = await getUserId()

  try {
    const githubAccessToken = await getGitHubAccessToken(/* code from GitHub OAuth flow */);
    const organizations = await fetchGitHubOrganizations(githubAccessToken);
    
    // For simplicity, we're using the first organization. In a real app, you'd want to let the user choose.
    const selectedOrg = organizations[0];

    const [result] = await db
      .insert(workspacesTable)
      .values({
        ...data,
        userId,
        githubOrganizationId: selectedOrg.id,
        githubOrganizationName: selectedOrg.login,
      })
      .returning()
    revalidatePath("/")
    return result
  } catch (error) {
    console.error("Error creating workspace record:", error)
    throw error
  }
}

// ... (rest of the file remains unchanged)
