import React from 'react';
import { render } from '@testing-library/react';
import { Toggle } from '../../../components/ui/toggle';

describe('Toggle component', () => {
    it('renders correctly', () => {
        const { getByRole } = render(<Toggle />);
        expect(getByRole('checkbox')).toBeInTheDocument();
    });
});
