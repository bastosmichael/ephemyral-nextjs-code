import { render } from "@testing-library/react"
import { Card } from "@/components/ui/card"

describe("Card", () => {
    it("renders correctly", () => {
        const { getByText } = render(<Card>Card Content</Card>)
        expect(getByText("Card Content")).toBeInTheDocument()
    })
})
