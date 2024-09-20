import { render, fireEvent } from "@testing-library/react"
import { Button } from "@/components/ui/button"

describe("Button", () => {
    it("should render a button with text", () => {
        const { getByText } = render(<Button label="Click Me" onClick={() => {}} />)
        expect(getByText("Click Me")).toBeInTheDocument()
    })
    
    it("should handle button click correctly", () => {
        const handleClick = jest.fn()
        const { getByText } = render(<Button label="Click Me" onClick={handleClick} />)
        fireEvent.click(getByText("Click Me"))
        expect(handleClick).toHaveBeenCalled()
    })
})
