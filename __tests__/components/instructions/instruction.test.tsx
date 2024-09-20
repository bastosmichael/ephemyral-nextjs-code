import { render } from '@testing-library/react';
import { Instruction } from '../../../components/instructions/instruction';

describe('Instruction component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Instruction instruction={{ id: '1', name: 'Test Instruction', content: 'Test Content' }} />);
    expect(getByText('Test Instruction')).toBeInTheDocument();
  });
});
