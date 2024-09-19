import React from 'react';
import { render } from '@testing-library/react';
import { DataList } from '../../../../components/dashboard/reusable/data-list';

describe('Data List', () => {
  it('renders the data list correctly', () => {
    const { getByText } = render(
      <DataList title="Test Title" subtitle="Test Subtitle">
        <div>Test Item</div>
      </DataList>
    );
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Item')).toBeInTheDocument();
  });
});
