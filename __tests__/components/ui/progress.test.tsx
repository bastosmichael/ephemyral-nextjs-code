import { render } from '@testing-library/react';
import { Progress } from '../../../components/ui/progress';

describe('Progress component', () => {
    it('renders correctly', () => {
        const { getByRole } = render(<Progress value={50} />);
        expect(getByRole('progressbar')).toBeInTheDocument();
    });
});
