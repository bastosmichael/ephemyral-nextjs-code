import { cn } from "@/lib/utils"
import { Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import { HTMLAttributes } from "react"

interface EditWorkspaceButtonProps extends HTMLAttributes<HTMLDivElement> {
  workspaceId: string
}

export function EditWorkspaceButton({
  workspaceId,
  ...props
}: EditWorkspaceButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`https://github.com/organizations/${workspaceId}/settings/profile`)
  }

  return (
    <div className={cn("", props.className)}>
      <div
        onClick={handleClick}
        className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm"
      >
        <Settings className="size-4" />
        <div>Organization Settings</div>
      </div>
    </div>
  )
}
