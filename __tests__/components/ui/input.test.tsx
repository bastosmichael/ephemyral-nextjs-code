import React from 'react';
import { render } from '@testing-library/react';
import { Input } from '../../../components/ui/input';

describe('Input component', () => {
    it('renders correctly', () => {
        const { getByRole } = render(<Input />);
        expect(getByRole('textbox')).toBeInTheDocument();
    });

    it('handles user input', () => {
        const { getByRole } = render(<Input />);
        const input = getByRole('textbox') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'test' } });
        expect(input.value).toBe('test');
    });

    it('applies custom className', () => {
        const { getByRole } = render(<Input className="custom-class" />);
        expect(getByRole('textbox')).toHaveClass('custom-class');
    });
});
