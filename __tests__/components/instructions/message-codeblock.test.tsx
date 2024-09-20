import React from 'react';
import { MessageCodeBlock } from '../../../components/instructions/message-codeblock';
import { render } from '@testing-library/react';

describe('MessageCodeBlock component', () => {
    it('renders code and actions correctly', () => {
        const { getByText } = render(<MessageCodeBlock language="javascript" value="const x = 1;" />)
        expect(getByText('const x = 1;')).toBeInTheDocument();
    });
});
