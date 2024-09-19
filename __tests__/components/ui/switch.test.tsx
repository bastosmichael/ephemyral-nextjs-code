import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Switch } from '../../../components/ui/switch';

describe('Switch component', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<Switch />);
    expect(getByRole('switch')).toBeInTheDocument();
  });

  it('toggles on click', () => {
    const { getByRole } = render(<Switch />);
    const switchElement = getByRole('switch');
    fireEvent.click(switchElement);
    expect(switchElement).toHaveAttribute('data-state', 'on'); // Adjust the condition to match your implementation
  });
});
