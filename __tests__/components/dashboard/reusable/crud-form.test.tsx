import React from 'react';
import { render } from '@testing-library/react';
import { CRUDForm } from '../../../../components/dashboard/reusable/crud-form';

describe('CRUDForm component', () => {
    it('renders correctly', () => {
        const { getByPlaceholderText } = render(<CRUDForm itemName="Test" buttonText="Create" onSubmit={async () => {}}><input placeholder="Name" /></CRUDForm>);
        expect(getByPlaceholderText('Name')).toBeInTheDocument();
    });
});
