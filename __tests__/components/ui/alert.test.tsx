import { render } from '@testing-library/react';
import { Alert } from '../../../components/ui/alert';

describe('Alert component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Alert>Alert message</Alert>);
        expect(getByText('Alert message')).toBeInTheDocument();
    });
});
