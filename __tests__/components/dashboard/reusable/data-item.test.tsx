import React from 'react';
import { render } from '@testing-library/react';
import { DataItem } from '../../../../components/dashboard/reusable/data-item';

describe('DataItem component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<DataItem data={{ id: "1", name: "Test Item" }} type="test" onDelete={async () => {}} />);
        expect(getByText('Test Item')).toBeInTheDocument();
    });
});
