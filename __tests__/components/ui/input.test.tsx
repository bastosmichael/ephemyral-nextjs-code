import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Input } from '../../../components/ui/input';

describe('Input component', () => {
  it('renders input with default props', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Enter text" />);
    expect(getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('calls onChange function when input value changes', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(<Input placeholder="Test input" onChange={handleChange} />);
    const input = getByPlaceholderText('Test input');
    
    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
