import React from 'react';
import { render } from '@testing-library/react';
import { Select } from '../../../components/ui/select';

describe('Select component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Select><Select.Option value="option1">Option 1</Select.Option></Select>);
        expect(getByText('Option 1')).toBeInTheDocument();
    });
});
