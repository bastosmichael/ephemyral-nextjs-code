"use client"

import { Github } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC, useState } from "react"
import { Integration } from "./integration"

interface ConnectGitHubProps {
  isGitHubConnected: boolean
}

export const ConnectGitHub: FC<ConnectGitHubProps> = ({
  isGitHubConnected
}) => {
  const router = useRouter()
  const params = useParams()

  const [isConnecting, setIsConnecting] = useState(false)

  const workspaceId = params.workspaceId as string

  const handleConnect = async () => {
    try {
      if (!workspaceId) {
        throw new Error("Workspace ID not found")
      }

      setIsConnecting(true)

      const state = encodeURIComponent(JSON.stringify({ workspaceId }))
      const baseUrl = `https://github.com/apps/${process.env.NEXT_PUBLIC_GITHUB_APP_NAME}/installations/new`
      const githubUrl = `${baseUrl}?state=${state}`

      router.push(githubUrl)
    } catch (error) {
      console.error("GitHub connection error:", error)
      router.push(`/workspaces`)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Integration
      name="GitHub"
      icon={<Github className="size-5" />}
      isConnecting={isConnecting}
      isConnected={isGitHubConnected}
      disabled={isConnecting || isGitHubConnected}
      onClick={handleConnect}
    />
  )
}
