import React from 'react';
import { render } from '@testing-library/react';
import { Select } from '../../components/ui/select';

describe('Select component', () => {
  it('renders the select component correctly', () => {
    const { getByPlaceholderText } = render(
      <Select placeholder="Select an option">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </Select>
    );
    expect(getByPlaceholderText('Select an option')).toBeInTheDocument();
  });
});
