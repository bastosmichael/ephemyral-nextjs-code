import React from 'react';
import { render } from '@testing-library/react';
import { Input } from '../ui/input';

describe('Input component', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<Input />);
    expect(getByRole('textbox')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { getByRole } = render(<Input className="custom-class" />);
    expect(getByRole('textbox')).toHaveClass('custom-class');
  });
});
