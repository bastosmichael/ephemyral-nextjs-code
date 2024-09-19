import React from 'react';
import { render } from '@testing-library/react';
import { Card } from '../../components/ui/card';

describe('Card Component', () => {
  it('renders correctly with given content', () => {
    const { getByText } = render(<Card>Test Content</Card>);
    expect(getByText('Test Content')).toBeInTheDocument();
  });
});
