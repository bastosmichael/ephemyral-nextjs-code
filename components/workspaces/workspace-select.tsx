"use client"

import { getWorkspacesByUserId } from "@/db/queries/workspaces-queries"
import { cn } from "@/lib/utils"
import { Check, ChevronDown } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC, HTMLAttributes, useEffect, useState } from "react"
import { Button } from "../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CreateWorkspaceButton } from "./create-workspace-button"
import { EditWorkspaceButton } from "./edit-workspace-button"

interface WorkspaceSelectProps extends HTMLAttributes<HTMLDivElement> {
  installationId: number | null
}

export const WorkspaceSelect: FC<WorkspaceSelectProps> = ({ installationId, ...props }) => {
  const [workspaces, setWorkspaces] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const router = useRouter()
  const params = useParams()

  const workspaceId = params.workspaceId as string

  useEffect(() => {
    setValue(workspaceId)
  }, [workspaceId])

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const fetchedWorkspaces = await getWorkspacesByUserId(installationId)
      setWorkspaces(fetchedWorkspaces)
    }
    fetchWorkspaces()
  }, [installationId])

  const handleWorkspaceSelect = async (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue)
    setOpen(false)
    router.push(`/${currentValue}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-start"
        >
          <div className="truncate font-bold">
            {value
              ? workspaces.find(workspace => workspace.id === value)?.githubOrgName
              : "Select workspace..."}
          </div>
          <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search workspace..." />

          <CommandList className="mx-1 mt-1">
            <CommandEmpty>No workspaces found.</CommandEmpty>

            <CommandGroup>
              {workspaces.map(workspace => (
                <CommandItem
                  key={workspace.id}
                  value={workspace.id}
                  onSelect={handleWorkspaceSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === workspace.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="truncate">{workspace.githubOrgName}</div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <hr className="my-1" />

          <EditWorkspaceButton
            workspaceId={workspaceId}
            className="mx-2 my-1"
          />

          <hr className="my-1" />

          <CreateWorkspaceButton className="mx-2 mb-2 mt-1" installationId={installationId} />
        </Command>
      </PopoverContent>
    </Popover>
  )
}
