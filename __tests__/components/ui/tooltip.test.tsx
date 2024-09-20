import { render } from '@testing-library/react';
import { Tooltip } from '../../../components/ui/tooltip';

describe('Tooltip component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Tooltip>Tooltip Text</Tooltip>);
        expect(getByText('Tooltip Text')).toBeInTheDocument();
    });
});
