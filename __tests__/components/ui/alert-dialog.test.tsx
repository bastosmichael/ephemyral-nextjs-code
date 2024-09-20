import React from 'react';
import { render } from '@testing-library/react';
import { AlertDialog } from '../../../components/ui/alert-dialog';

describe('AlertDialog component', () => {
    it('renders correctly when open', () => {
        const { getByText } = render(<AlertDialog open><AlertDialog.Title>Alert</AlertDialog.Title></AlertDialog>);
        expect(getByText('Alert')).toBeInTheDocument();
    });
});
