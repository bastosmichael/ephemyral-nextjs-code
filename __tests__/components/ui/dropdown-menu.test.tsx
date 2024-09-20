import React from 'react';
import { render } from '@testing-library/react';
import { DropdownMenu } from '../../../components/ui/dropdown-menu';

describe('Dropdown Menu component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<DropdownMenu><DropdownMenuTrigger>Menu</DropdownMenuTrigger><DropdownMenuContent>Content</DropdownMenuContent></DropdownMenu>);
        expect(getByText('Menu')).toBeInTheDocument();
    });
});
