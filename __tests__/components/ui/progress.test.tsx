import React from 'react';
import { render } from '@testing-library/react';
import { Progress } from '../../../components/ui/progress';

describe('Progress component', () => {
  it('renders the progress component correctly', () => {
    const { getByRole } = render(<Progress value={50} />);
    expect(getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
  });
});
