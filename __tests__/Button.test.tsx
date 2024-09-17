import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../components/Button'

describe('Button component', () => {
  it('renders the button with the correct label', () => {
    const mockOnClick = jest.fn()
    render(<Button label="Click me" onClick={mockOnClick} />)
    
    const button = screen.getByText('Click me')
    expect(button).toBeInTheDocument()
  })

  it('calls the onClick function when clicked', () => {
    const mockOnClick = jest.fn()
    render(<Button label="Click me" onClick={mockOnClick} />)
    
    const button = screen.getByText('Click me')
    fireEvent.click(button)
    
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
