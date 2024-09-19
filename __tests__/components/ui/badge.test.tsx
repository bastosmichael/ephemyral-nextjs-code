import React from 'react';
import { render } from '@testing-library/react';
import { Badge } from '../../../components/ui/badge';

describe('Badge component', () => {
  it('renders the badge correctly', () => {
    const { getByText } = render(<Badge>Test Badge</Badge>);
    expect(getByText('Test Badge')).toBeInTheDocument();
  });
});
