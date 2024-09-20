import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../../../components/Button';

describe('Button Component', () => {
  it('renders the button with the correct label', () => {
    const { getByText } = render(<Button label="Click me" onClick={() => {}} />);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('calls the onClick function when clicked', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(<Button label="Click me" onClick={mockOnClick} />);
    fireEvent.click(getByText('Click me'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
