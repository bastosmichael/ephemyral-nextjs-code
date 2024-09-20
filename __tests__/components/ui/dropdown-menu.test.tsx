import { render } from "@testing-library/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

describe("DropdownMenu", () => {
    it("renders correctly", () => {
        const { getByText } = render(
          <DropdownMenu>
            <DropdownMenuTrigger>Trigger Menu</DropdownMenuTrigger>
            <DropdownMenuContent>Content</DropdownMenuContent>
          </DropdownMenu>
        )
        expect(getByText("Trigger Menu")).toBeInTheDocument()
    })
})
