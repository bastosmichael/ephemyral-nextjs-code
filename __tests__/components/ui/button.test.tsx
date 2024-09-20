import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from '../../../components/ui/button';

describe('Button component', () => {
    it('renders correctly with the given label', () => {
        const { getByText } = render(<Button>Click me</Button>);
        expect(getByText('Click me')).toBeInTheDocument();
    });

    it('triggers onClick when clicked', () => {
        const onClick = jest.fn();
        const { getByText } = render(<Button onClick={onClick}>Click me</Button>);
        fireEvent.click(getByText('Click me'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('applies custom className', () => {
        const { getByText } = render(<Button className="custom-class">Click me</Button>);
        expect(getByText('Click me')).toHaveClass('custom-class');
    });
});
