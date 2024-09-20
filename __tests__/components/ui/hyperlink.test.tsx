import React from 'react';
import { render } from '@testing-library/react';
import { Hyperlink } from '../../../../components/ui/hyperlink';

describe('Hyperlink component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Hyperlink href="#">Click here</Hyperlink>);
        expect(getByText('Click here')).toBeInTheDocument();
    });
});
