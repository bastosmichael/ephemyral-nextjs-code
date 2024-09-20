import React from 'react';
import { render } from '@testing-library/react';
import { Pagination } from '../../../components/ui/pagination';

describe('Pagination component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Pagination><Pagination.Item>1</Pagination.Item></Pagination>);
        expect(getByText('1')).toBeInTheDocument();
    });
});
