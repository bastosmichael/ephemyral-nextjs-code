import { render, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('should render correctly with the given label', () => {
    const label = 'Click me';
    const { getByText } = render(<Button>{label}</Button>);
    expect(getByText(label)).toBeInTheDocument();
  });

  it('should trigger onClick when clicked', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(<Button onClick={mockOnClick}>Click me</Button>);
    fireEvent.click(getByText('Click me'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
