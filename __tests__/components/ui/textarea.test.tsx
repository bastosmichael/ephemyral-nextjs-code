import React from 'react';
import { render } from '@testing-library/react';
import { Textarea } from '../../../components/ui/textarea';

describe('Textarea component', () => {
    it('renders correctly', () => {
        const { getByRole } = render(<Textarea />);
        expect(getByRole('textbox')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { getByRole } = render(<Textarea className="custom-class" />);
        expect(getByRole('textbox')).toHaveClass('custom-class');
    });
});
