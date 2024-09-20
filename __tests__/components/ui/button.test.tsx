import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../../../components/Button';

describe('Button component', () => {
  it('renders correctly with the given label', () => {
    const label = 'Click me';
    const { getByText } = render(<Button label={label} onClick={() => {}} />);
    expect(getByText(label)).toBeInTheDocument();
  });

  it('triggers onClick when clicked', () => {
    const onClick = jest.fn();
    const label = 'Click me';
    const { getByText } = render(<Button label={label} onClick={onClick} />);
    fireEvent.click(getByText(label));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
