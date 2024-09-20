import React from 'react';
import { render } from '@testing-library/react';
import { Checkbox } from '../../../components/ui/checkbox';

describe('Checkbox component', () => {
    it('renders correctly', () => {
        const { getByRole } = render(<Checkbox />);
        expect(getByRole('checkbox')).toBeInTheDocument();
    });
});
