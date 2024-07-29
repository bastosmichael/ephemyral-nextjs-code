import React from 'react';
import { render, screen } from '@testing-library/react';

test('renders hello world', () => {
  render(<div>Hello, World!</div>);
  const helloElement = screen.getByText(/hello, world!/i);
  expect(helloElement).toBeInTheDocument();
});
