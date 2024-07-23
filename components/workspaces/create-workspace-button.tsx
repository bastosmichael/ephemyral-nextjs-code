"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { associateWorkspace } from "@/db/queries/workspaces-queries"
import { fetchUserOrganizations } from "@/services/github-api"
import { cn } from "@/lib/utils"
import { PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { FC, HTMLAttributes, useState } from "react"

interface CreateWorkspaceButtonProps extends HTMLAttributes<HTMLDivElement> {
  installationId: number | null
}

export const CreateWorkspaceButton: FC<CreateWorkspaceButtonProps> = ({
  installationId,
  ...props
}) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [selectedOrg, setSelectedOrg] = useState("")
  const [organizations, setOrganizations] = useState<any[]>([])

  const handleCreateWorkspace = async () => {
    try {
      if (!selectedOrg) {
        throw new Error("No organization selected")
      }

      const workspace = await associateWorkspace(selectedOrg, organizations.find(org => org.id.toString() === selectedOrg).login)
      router.push(`/${workspace.id}`)
      setOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleOpenChange = async (newOpen: boolean) => {
    if (newOpen) {
      const orgs = await fetchUserOrganizations(installationId)
      setOrganizations(orgs)
    }
    setOpen(newOpen)
  }

  return (
    <div className={cn("", props.className)}>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <PlusIcon className="mr-2 size-4" />
            Workspace
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Associate GitHub Organization</DialogTitle>
          </DialogHeader>
          <select
            value={selectedOrg}
            onChange={(e) => setSelectedOrg(e.target.value)}
            className="mt-4 w-full rounded-md border p-2"
          >
            <option value="">Select an organization</option>
            {organizations.map(org => (
              <option key={org.id} value={org.id}>{org.login}</option>
            ))}
          </select>
          <DialogFooter>
            <Button onClick={handleCreateWorkspace}>Associate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
