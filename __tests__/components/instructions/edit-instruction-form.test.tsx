import React from 'react';
import { render } from '@testing-library/react';
import EditInstructionForm from '../../components/instructions/edit-instruction-form';

describe('Edit Instruction Form', () => {
  it('renders edit form fields correctly', () => {
    const { getByPlaceholderText } = render(<EditInstructionForm />);
    expect(getByPlaceholderText('Edit instruction name')).toBeInTheDocument();
    expect(getByPlaceholderText('Edit instruction content')).toBeInTheDocument();
  });
});
