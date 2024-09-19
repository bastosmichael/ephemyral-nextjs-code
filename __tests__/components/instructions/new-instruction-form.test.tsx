import React from 'react';
import { render } from '@testing-library/react';
import NewInstructionForm from '../../components/instructions/new-instruction-form';

describe('New Instruction Form', () => {
  it('renders form fields correctly', () => {
    const { getByPlaceholderText } = render(<NewInstructionForm />);
    expect(getByPlaceholderText('Enter instruction name')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter instruction content')).toBeInTheDocument();
  });
});
