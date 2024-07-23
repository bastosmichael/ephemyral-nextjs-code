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
import { listOrganizationRepositories, createRepositoryInOrganization } from "@/services/github-api"

export async function createProject(
  data: Omit<InsertProject, "userId" | "githubRepoId" | "githubRepoName" | "githubDefaultBranch">,
  installationId: number | null
): Promise<SelectProject> {
  const userId = await getUserId()

  try {
    const workspace = await db.query.workspaces.findFirst({
      where: eq(workspacesTable.id, data.workspaceId)
    })

    if (!workspace) {
      throw new Error("Workspace not found")
    }

    const repo = await createRepositoryInOrganization(workspace.githubOrgName, data.name, installationId)

    const [result] = await db
      .insert(projectsTable)
      .values({
        ...data,
        userId,
        githubRepoId: repo.id.toString(),
        githubRepoName: repo.name,
        githubDefaultBranch: repo.default_branch
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
  id: string,
  installationId: number | null
): Promise<SelectProject | undefined> {
  try {
    const project = await db.query.projects.findFirst({
      where: eq(projectsTable.id, id)
    })

    if (project) {
      const workspace = await db.query.workspaces.findFirst({
        where: eq(workspacesTable.id, project.workspaceId)
      })

      if (workspace) {
        const repos = await listOrganizationRepositories(workspace.githubOrgName, installationId)
        const repoDetails = repos.find(repo => repo.id.toString() === project.githubRepoId)
        return { ...project, ...repoDetails }
      }
    }

    return project
  } catch (error) {
    console.error(`Error getting project by id ${id}:`, error)
    throw error
  }
}

export async function getProjectsByWorkspaceId(
  workspaceId: string,
  installationId: number | null
): Promise<SelectProject[]> {
  try {
    const projects = await db.query.projects.findMany({
      where: eq(projectsTable.workspaceId, workspaceId),
      orderBy: desc(projectsTable.updatedAt)
    })

    const workspace = await db.query.workspaces.findFirst({
      where: eq(workspacesTable.id, workspaceId)
    })

    if (workspace) {
      const repos = await listOrganizationRepositories(workspace.githubOrgName, installationId)
      return projects.map(project => {
        const repoDetails = repos.find(repo => repo.id.toString() === project.githubRepoId)
        return { ...project, ...repoDetails }
      })
    }

    return projects
  } catch (error) {
    console.error(`Error getting projects for workspace ${workspaceId}:`, error)
    throw error
  }
}

export async function updateProject(
  id: string,
  data: Partial<InsertProject>,
  installationId: number | null
): Promise<void> {
  try {
    const project = await getProjectById(id, installationId)
    if (!project) {
      throw new Error("Project not found")
    }

    // Here you would update the GitHub repository if needed
    // For now, we'll just update the local database
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

export async function deleteProject(id: string, installationId: number | null): Promise<void> {
  try {
    const project = await getProjectById(id, installationId)
    if (!project) {
      throw new Error("Project not found")
    }

    // Here you would delete the GitHub repository if needed
    // For now, we'll just delete from the local database
    await db.delete(projectsTable).where(and(eq(projectsTable.id, id)))
    revalidatePath("/")
  } catch (error) {
    console.error(`Error deleting project ${id}:`, error)
    throw error
  }
}
