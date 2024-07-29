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
import { InsertIssue, issuesTable, SelectIssue } from "../schema/issues-schema"
import { listRepos } from "@/actions/github/list-repos"
import { listBranches } from "@/actions/github/list-branches"
import { workspacesTable } from "../schema/workspaces-schema"
import {
  InsertInstruction,
  instructionsTable,
  SelectInstruction
} from "../schema/instructions-schema"
import { InsertTemplate, SelectTemplate, templatesTable } from "../schema/templates-schema"
import { templatesToInstructionsTable } from "../schema/templates-to-instructions-schema"
import { issuesToInstructionsTable } from "../schema/issues-to-instructions-schema"
import { addInstructionToIssue } from "./issues-to-instructions-queries"
import { addInstructionToTemplate } from "./templates-to-instructions-queries"

export async function createProjects(workspaces: any[]): Promise<any[]> {
  try {
    const projectCreationPromises = workspaces.map(async workspace => {
      if (workspace.githubOrganizationId) {
        const organizationId = workspace.githubOrganizationName
        const repositories = await listRepos(null, organizationId)

        // Log the repositories
        console.log("Repositories for workspace", workspace.id, repositories)

        const projects = await Promise.all(
          repositories.map(async (repo: any) => {
            let githubTargetBranch = null
            const branches = await listBranches(null, repo.full_name)
            if (branches.includes("main")) {
              githubTargetBranch = "main"
            } else if (branches.includes("master")) {
              githubTargetBranch = "master"
            }

            const project = await createProject({
              name: repo.name,
              workspaceId: workspace.id,
              githubRepoId: repo.id, // Passing repository ID as INTEGER
              githubRepoFullName: repo.full_name, // Assigning repo.full_name to githubRepoFullName
              githubTargetBranch: githubTargetBranch // Assigning target branch if exists
            })

            const instruction = await createSampleInstruction(project.id, repo) // Create a sample instruction for the project
            const template = await createSampleTemplate(project.id, repo) // Create a sample template for the project
            await addInstructionToTemplate(template.id, instruction.id) // Tie the instruction to the template

            const issue = await createSampleIssue(project.id, repo) // Create a sample issue for the project
            await addInstructionToIssue(issue.id, instruction.id) // Tie the instruction to the issue

            return project
          })
        )

        // Log the created projects
        console.log("Created projects for workspace", workspace.id, projects)

        return projects
      } else {
        throw new Error("Workspace GitHub organization ID is undefined")
      }
    })

    const projects = await Promise.all(projectCreationPromises)

    // Flatten the array of projects
    return projects.flat()
  } catch (error) {
    console.error("Error creating projects:", error)
    throw error
  }
}

export async function createProject(
  data: Omit<InsertProject, "userId">
): Promise<SelectProject> {
  const userId = await getUserId()

  try {
    const [result] = await db
      .insert(projectsTable)
      .values({ ...data, userId })
      .returning()
    revalidatePath("/")
    await updateWorkspaceUpdatedAt(data.workspaceId) // Update the workspace's updatedAt field
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
    const project = await getProjectById(id)
    if (!project) {
      throw new Error(`Project with id ${id} not found`)
    }
    await db
      .update(projectsTable)
      .set(data)
      .where(and(eq(projectsTable.id, id)))
    revalidatePath("/")
    await updateWorkspaceUpdatedAt(project.workspaceId) // Update the workspace's updatedAt field
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
    const project = await getProjectById(id)
    if (!project) {
      throw new Error(`Project with id ${id} not found`)
    }
    await db.delete(projectsTable).where(and(eq(projectsTable.id, id)))
    revalidatePath("/")
    await updateWorkspaceUpdatedAt(project.workspaceId) // Update the workspace's updatedAt field
  } catch (error) {
    console.error(`Error deleting project ${id}:`, error)
    throw error
  }
}

async function updateWorkspaceUpdatedAt(workspaceId: string): Promise<void> {
  try {
    await db
      .update(workspacesTable)
      .set({ updatedAt: new Date() })
      .where(eq(workspacesTable.id, workspaceId))
  } catch (error) {
    console.error(`Error updating workspace ${workspaceId}:`, error)
    throw error
  }
}

async function createSampleInstruction(
  projectId: string,
  repo: any
): Promise<SelectInstruction> {
  const userId = await getUserId()

  try {
    const instructionData: InsertInstruction = {
      projectId,
      userId,
      name: `Sample Instruction for ${repo.name}`,
      content: `This is a sample instruction created for the repository ${repo.full_name}.`
    }

    const [instruction] = await db
      .insert(instructionsTable)
      .values(instructionData)
      .returning()
    return instruction
  } catch (error) {
    console.error(
      `Error creating sample instruction for project ${projectId}:`,
      error
    )
    throw error
  }
}

async function createSampleTemplate(
  projectId: string,
  repo: any
): Promise<SelectTemplate> {
  const userId = await getUserId()

  try {
    const templateData: InsertTemplate = {
      projectId,
      userId,
      name: `Sample Template for ${repo.name}`,
      content: `This is a sample template created for the repository ${repo.full_name}.`
    }

    const [template] = await db
      .insert(templatesTable)
      .values(templateData)
      .returning()
    return template
  } catch (error) {
    console.error(
      `Error creating sample template for project ${projectId}:`,
      error
    )
    throw error
  }
}

async function createSampleIssue(
  projectId: string,
  repo: any
): Promise<SelectIssue> {
  const userId = await getUserId()

  try {
    const issueData: InsertIssue = {
      projectId,
      userId,
      name: `Sample Issue for ${repo.name}`,
      content: `This is a sample issue created for the repository ${repo.full_name}.`
    }

    const [issue] = await db.insert(issuesTable).values(issueData).returning()
    return issue
  } catch (error) {
    console.error(
      `Error creating sample issue for project ${projectId}:`,
      error
    )
    throw error
  }
}
