import { render } from '@testing-library/react';
import EditInstructionForm from '../../../components/instructions/edit-instruction-form';

describe('EditInstructionForm component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <EditInstructionForm instruction={{ id: '1', name: 'Test Instruction', content: 'Test Content' }} />
    );
    expect(getByText('Test Instruction')).toBeInTheDocument();
  });
});
