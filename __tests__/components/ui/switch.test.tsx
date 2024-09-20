import React from 'react';
import { render } from '@testing-library/react';
import { Switch } from '../../../components/ui/switch';

describe('Switch component', () => {
    it('renders correctly', () => {
        const { getByRole } = render(<Switch />);
        expect(getByRole('checkbox')).toBeInTheDocument();
    });
});
