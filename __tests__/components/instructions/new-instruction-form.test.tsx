import { render } from "@testing-library/react"
import NewInstructionForm from "@/components/instructions/new-instruction-form"

describe("NewInstructionForm", () => {
    it("renders correctly", () => {
        const { getByText } = render(<NewInstructionForm />)
        expect(getByText("Create")).toBeInTheDocument()
    })
})
