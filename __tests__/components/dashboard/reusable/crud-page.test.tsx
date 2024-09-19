import React from 'react';
import { render } from '@testing-library/react';
import { CRUDPage } from '../../../../components/dashboard/reusable/crud-page';

describe('CRUD Page', () => {
  it('renders the CRUD page title correctly', () => {
    const { getByText } = render(
      <CRUDPage pageTitle="Test CRUD Page" backText="Back" backLink="#">
        <div>Test Content</div>
      </CRUDPage>
    );
    expect(getByText('Test CRUD Page')).toBeInTheDocument();
    expect(getByText('Test Content')).toBeInTheDocument();
  });
});
