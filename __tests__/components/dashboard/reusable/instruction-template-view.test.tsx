import React from 'react';
import { render } from '@testing-library/react';
import { InstructionTemplateView } from '../../../../components/dashboard/reusable/instruction-template-view';

describe('InstructionTemplateView component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<InstructionTemplateView item={{ id: "1", name: "Test Instruction", content: "Test Content" }} type="instruction" onDelete={async () => {}} />);
        expect(getByText('Test Instruction')).toBeInTheDocument();
    });
});
