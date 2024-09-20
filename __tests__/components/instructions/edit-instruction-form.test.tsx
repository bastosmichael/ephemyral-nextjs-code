import { render } from "@testing-library/react"
import EditInstructionForm from "@/components/instructions/edit-instruction-form"

describe("EditInstructionForm", () => {
    it("renders correctly", () => {
        const { getByPlaceholderText } = render(
            <EditInstructionForm instruction={{ id: "1", name: "Instruction", content: "Content" }} />
        )
        expect(getByPlaceholderText("Instruction name")).toBeInTheDocument()
        expect(getByPlaceholderText("Instruction content...")).toBeInTheDocument()
    })
})
