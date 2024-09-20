import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom matchers
import EditInstructionForm from '../../../components/instructions/edit-instruction-form';
import React from 'react';

describe('EditInstructionForm component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <EditInstructionForm instruction={{ id: '1', name: 'Test Instruction', content: 'Test Content' }} />
    );
    expect(getByText('Test Instruction')).toBeInTheDocument();
  });
});
