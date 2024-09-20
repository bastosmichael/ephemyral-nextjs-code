import React from 'react';
import { render } from '@testing-library/react';
import { Select } from '../../../components/ui/select';

describe('Select component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Select><SelectTrigger>Trigger</SelectTrigger><SelectContent><SelectItem value="item1">Item 1</SelectItem></SelectContent></Select>);
        expect(getByText('Trigger')).toBeInTheDocument();
    });
});
