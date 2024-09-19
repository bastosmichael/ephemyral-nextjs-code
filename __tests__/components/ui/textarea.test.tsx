import React from 'react';
import { render } from '@testing-library/react';
import { Textarea } from '../../../components/ui/textarea';

describe('Textarea component', () => {
  it('renders the textarea correctly', () => {
    const { getByPlaceholderText } = render(<Textarea placeholder="Type here" />);
    expect(getByPlaceholderText('Type here')).toBeInTheDocument();
  });
});
