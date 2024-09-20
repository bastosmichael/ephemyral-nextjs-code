import React from 'react';
import { render } from '@testing-library/react';
import { DataList } from '../../../components/dashboard/reusable/data-list';

describe('DataList component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<DataList title="List" subtitle="Subtitle" readMoreLink="#" readMoreText="More..." createLink="#" createText="Create" dataListTitle="Items"><div>Content</div></DataList>);
        expect(getByText('List')).toBeInTheDocument();
    });
});
