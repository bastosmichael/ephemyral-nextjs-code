import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from '../components/ui/button';

describe('Button component', () => {
  it('renders the button with the correct label', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('calls the onClick function when clicked', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(<Button onClick={mockOnClick}>Click me</Button>);
    fireEvent.click(getByText('Click me'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { getByText } = render(<Button className="custom-class">Click me</Button>);
    expect(getByText('Click me')).toHaveClass('custom-class');
  });

  it('renders as a different element when asChild is true', () => {
    const { container } = render(
      <Button asChild>
        <a href="/">Link</a>
      </Button>
    );
    expect(container.querySelector('a')).toBeInTheDocument();
  });

  it('applies variant styles correctly', () => {
    const { getByText } = render(<Button variant="destructive">Delete</Button>);
    expect(getByText('Delete')).toHaveClass('bg-destructive');
  });

  it('applies size styles correctly', () => {
    const { getByText } = render(<Button size="sm">Small</Button>);
    expect(getByText('Small')).toHaveClass('h-9');
  });
});
