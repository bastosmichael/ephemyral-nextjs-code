import React from 'react';
import { render } from '@testing-library/react';
import { Label } from '../../../components/ui/label';

describe('Label component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Label>Label Text</Label>);
        expect(getByText('Label Text')).toBeInTheDocument();
    });
});
