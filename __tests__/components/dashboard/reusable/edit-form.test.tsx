import React from 'react';
import { render } from '@testing-library/react';
import { EditForm } from '../../../../components/dashboard/reusable/edit-form';

describe('EditForm component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<EditForm action={async () => {}}><div>Edit Content</div></EditForm>);
        expect(getByText('Edit Content')).toBeInTheDocument();
    });
});
