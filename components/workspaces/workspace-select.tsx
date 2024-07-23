"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, ChevronDown } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC, HTMLAttributes, useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { CreateWorkspaceButton } from "./create-workspace-button"
import { EditWorkspaceButton } from "./edit-workspace-button"

interface WorkspaceSelectProps extends HTMLAttributes<HTMLDivElement> {
  workspaces: {
    id: string
    name: string
    githubOrganizationName: string
  }[]
}

export const WorkspaceSelect: FC<WorkspaceSelectProps> = ({ workspaces }) => {
  const workspaceValues = workspaces.map(workspace => ({
    value: workspace.id,
    label: `${workspace.githubOrganizationName}`
  }))

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const router = useRouter()
  const params = useParams()

  const workspaceId = params.workspaceId as string

  useEffect(() => {
    setValue(workspaceId)
  }, [workspaceId])

  const handleWorkspaceSelect = (currentValue: string) => {
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
              ? workspaceValues.find(workspace => workspace.value === value)?.label
              : "Select workspace..."}
          </div>
          <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search workspace..." />

          <CommandList className="mx-1 mt-1">
            <CommandEmpty>No workspaces found.</CommandEmpty>

            <CommandGroup>
              {workspaceValues.map(workspace => (
                <CommandItem
                  key={workspace.value}
                  value={workspace.value}
                  onSelect={handleWorkspaceSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === workspace.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="truncate">{workspace.label}</div>
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

          <CreateWorkspaceButton className="mx-2 mb-2 mt-1" />
        </Command>
      </PopoverContent>
    </Popover>
  )
}
