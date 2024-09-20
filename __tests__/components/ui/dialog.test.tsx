import React from 'react';
import { render } from '@testing-library/react';
import { Dialog } from '../../../components/ui/dialog';

describe('Dialog component', () => {
    it('renders correctly when open', () => {
        const { getByText } = render(<Dialog open><Dialog.Title>Dialog</Dialog.Title></Dialog>);
        expect(getByText('Dialog')).toBeInTheDocument();
    });
});
