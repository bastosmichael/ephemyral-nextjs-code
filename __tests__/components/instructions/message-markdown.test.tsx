import { render } from '@testing-library/react';
import { MessageMarkdown } from '../../../components/instructions/message-markdown';

describe('MessageMarkdown component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MessageMarkdown content={"Test content."} />);
    expect(getByText('Test content.')).toBeInTheDocument();
  });
});
