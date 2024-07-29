import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    const button = screen.getByText('Custom Button');
    expect(button).toHaveClass('custom-class');
  });

  it('renders as a child component when asChild prop is true', () => {
    render(
      <Button asChild>
        <a href="/">Link Button</a>
      </Button>
    );
    const linkButton = screen.getByText('Link Button');
    expect(linkButton.tagName).toBe('A');
    expect(linkButton).toHaveAttribute('href', '/');
  });

  it('applies variant styles', () => {
    render(<Button variant="destructive">Destructive Button</Button>);
    const button = screen.getByText('Destructive Button');
    expect(button).toHaveClass('bg-destructive');
  });

  it('applies size styles', () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByText('Small Button');
    expect(button).toHaveClass('h-9');
  });
});
