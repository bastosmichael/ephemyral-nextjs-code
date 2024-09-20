import { render } from "@testing-library/react"
import { InstructionsList } from "@/components/instructions/instruction-list"

describe("InstructionsList", () => {
    it("renders correctly when there are instructions", () => {
        const instructions = [{ id: "1", name: "Instruction 1", content: "Content 1" }]
        const { getByText } = render(<InstructionsList instructions={instructions} />)
        expect(getByText("Instructions")).toBeInTheDocument()
    })

    it("renders correctly when there are no instructions", () => {
        const { getByText } = render(<InstructionsList instructions={[]} />)
        expect(getByText("No instructions found.")).toBeInTheDocument()
    })
})
