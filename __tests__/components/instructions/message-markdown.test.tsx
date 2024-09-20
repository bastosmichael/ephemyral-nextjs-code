import { render } from '@testing-library/react';
import { MessageMarkdown } from '../../../components/instructions/message-markdown';

describe('MessageMarkdown component', () => {
    it('renders markdown content correctly', () => {
        const { getByText } = render(<MessageMarkdown content="Hello **world**!" />);
        expect(getByText('Hello')).toBeInTheDocument();
    });
});
