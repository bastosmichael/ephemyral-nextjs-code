import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MessageCodeBlock } from '../../../components/instructions/message-codeblock';

describe('MessageCodeBlock Component', () => {
  it('renders correctly with provided language and value', () => {
    const language = 'javascript';
    const value = 'console.log("Hello, World!");';
    const { getByText } = render(<MessageCodeBlock language={language} value={value} />);
    
    expect(getByText('javascript')).toBeInTheDocument();
    expect(getByText('console.log("Hello, World!");')).toBeInTheDocument();
  });

  it('displays download button and triggers download', () => {
    const language = 'python';
    const value = 'print("Hello, World!")';
    const { getByRole } = render(<MessageCodeBlock language={language} value={value} />);
    
    const downloadButton = getByRole('button', { name: /download/i });
    expect(downloadButton).toBeInTheDocument();

    // Mocking the download functionality
    const mockCreateElement = jest.fn();
    const mockAppendChild = jest.fn();
    const mockRemoveChild = jest.fn();
    const mockClick = jest.fn();
    const mockURL = {
      createObjectURL: jest.fn(() => 'mock-url'),
      revokeObjectURL: jest.fn(),
    };

    window.URL = mockURL as any;
    window.document.createElement = mockCreateElement;
    window.document.body.appendChild = mockAppendChild;
    window.document.body.removeChild = mockRemoveChild;
    window.HTMLAnchorElement.prototype.click = mockClick;

    fireEvent.click(downloadButton);

    expect(mockCreateElement).toHaveBeenCalledWith('a');
    expect(mockAppendChild).toHaveBeenCalled();
    expect(mockClick).toHaveBeenCalled();
    expect(mockRemoveChild).toHaveBeenCalled();
    expect(mockURL.createObjectURL).toHaveBeenCalled();
    expect(mockURL.revokeObjectURL).toHaveBeenCalledWith('mock-url');
  });

  it('displays copy button and copies content to clipboard', () => {
    const language = 'typescript';
    const value = 'const greeting: string = "Hello, World!";';
    const { getByRole } = render(<MessageCodeBlock language={language} value={value} />);
    
    const copyButton = getByRole('button', { name: /copy/i });
    expect(copyButton).toBeInTheDocument();

    // Mocking the clipboard functionality
    const mockClipboard = {
      writeText: jest.fn(),
    };

    window.navigator.clipboard = mockClipboard as any;

    fireEvent.click(copyButton);

    expect(mockClipboard.writeText).toHaveBeenCalledWith('const greeting: string = "Hello, World!";');
  });

  it('handles empty value correctly', () => {
    const language = 'java';
    const value = '';
    const { queryByText } = render(<MessageCodeBlock language={language} value={value} />);
    
    expect(queryByText('java')).toBeInTheDocument();
    expect(queryByText('')).toBeNull();
  });
});
