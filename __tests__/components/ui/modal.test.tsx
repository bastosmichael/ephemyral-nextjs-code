import { render } from '@testing-library/react';
import { Modal } from '../../../components/ui/modal';

describe('Modal component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Modal>Modal content</Modal>);
        expect(getByText('Modal content')).toBeInTheDocument();
    });
});
