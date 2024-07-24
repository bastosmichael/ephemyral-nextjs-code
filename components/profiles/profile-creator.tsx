"use client"

import { createProjects, createWorkspaces } from "@/db/queries"
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

        const projects = await createProjects(workspaces)

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
