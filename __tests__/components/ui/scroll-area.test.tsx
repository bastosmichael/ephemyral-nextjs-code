import React from 'react';
import { render } from '@testing-library/react';
import { ScrollArea } from '../../../components/ui/scroll-area';

describe('ScrollArea component', () => {
    it('renders correctly', () => {
        const { getByRole } = render(<ScrollArea><div>Hello</div></ScrollArea>);
        expect(getByRole('region')).toBeInTheDocument();
    });
});
