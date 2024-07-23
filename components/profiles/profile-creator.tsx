"use client"

import { createProject, createWorkspaces } from "@/db/queries"
import { createProfile } from "@/db/queries/profiles-queries"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const ProfileCreator = () => {
  const router = useRouter()

  useEffect(() => {
    const handleCreateProfile = async () => {
      try {
        await createProfile({})
        const workspaces = await createWorkspaces({ name: "Workspace" })

        // Create a project for each workspace
        const projectCreationPromises = workspaces.map(async (workspace) => {
          if (workspace.id) {
            return createProject({
              name: "Sample Project",
              workspaceId: workspace.id
            })
          } else {
            throw new Error("Workspace ID is undefined")
          }
        })

        const projects = await Promise.all(projectCreationPromises)

        // Assuming you want to navigate to the first project's issues page
        if (projects.length > 0) {
          router.push(`/workspaces`)
        }
      } catch (error) {
        console.error(error)
      }
    }

    handleCreateProfile()
  }, [router])

  return <></>
}
