import React from 'react';
import { render } from '@testing-library/react';
import { CRUDPage } from '../../../components/dashboard/reusable/crud-page';

describe('CRUDPage component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<CRUDPage pageTitle="Test" backText="Back" backLink="#"><div>Content here</div></CRUDPage>);
        expect(getByText('Test')).toBeInTheDocument();
    });
});
