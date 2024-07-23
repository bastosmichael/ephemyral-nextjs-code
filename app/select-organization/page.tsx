"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createWorkspaces } from '@/db/queries/workspaces-queries'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function SelectOrganizationPage() {
  const [organizations, setOrganizations] = useState([])
  const [selectedOrg, setSelectedOrg] = useState('')
  const [workspaceName, setWorkspaceName] = useState('')
  const router = useRouter()

  useEffect(() => {
    // In a real app, you'd fetch this from your secure session storage
    const sessionData = JSON.parse(atob(document.cookie.replace(/(?:(?:^|.*;\s*)session\s*\=\s*([^;]*).*$)|^.*$/, "$1")))
    setOrganizations(sessionData.organizations)
  }, [])

  const handleCreateWorkspace = async () => {
    if (!selectedOrg || !workspaceName) return

    try {
      const workspace = await createWorkspaces({
        name: workspaceName,
        githubOrganizationId: selectedOrg,
        githubOrganizationName: organizations.find(org => org.id === selectedOrg).login
      })
      router.push(`/${workspace.id}`)
    } catch (error) {
      console.error('Failed to create workspace:', error)
    }
  }

  return (
    <div className="container mx-auto mt-10 max-w-md">
      <h1 className="mb-6 text-2xl font-bold">Select GitHub Organization</h1>
      <Select onValueChange={setSelectedOrg}>
        <SelectTrigger>
          <SelectValue placeholder="Select an organization" />
        </SelectTrigger>
        <SelectContent>
          {organizations.map((org) => (
            <SelectItem key={org.id} value={org.id}>
              {org.login}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input
        type="text"
        placeholder="Workspace Name"
        value={workspaceName}
        onChange={(e) => setWorkspaceName(e.target.value)}
        className="mt-4 w-full rounded border p-2"
      />
      <Button onClick={handleCreateWorkspace} className="mt-4 w-full">
        Create Workspace
      </Button>
    </div>
  )
}
