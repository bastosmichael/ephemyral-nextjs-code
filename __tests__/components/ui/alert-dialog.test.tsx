import { render } from "@testing-library/react"
import { AlertDialog } from "@/components/ui/alert-dialog"

describe("AlertDialog", () => {
    it("renders correctly", () => {
        const { getByText } = render(<AlertDialog>Alert message</AlertDialog>)
        expect(getByText("Alert message")).toBeInTheDocument()
    })
})
