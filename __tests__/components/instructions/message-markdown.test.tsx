import React from 'react';
import { render, screen } from '@testing-library/react';
import { MessageMarkdown } from '../../../components/instructions/message-markdown';

describe('MessageMarkdown component', () => {
  it('renders markdown content correctly', () => {
    const content = '**Bold text** and *italic text*';
    render(<MessageMarkdown content={content} />);
    expect(screen.getByText('Bold text')).toBeInTheDocument();
    expect(screen.getByText('italic text')).toBeInTheDocument();
  });
});
