import { render } from '@testing-library/react';
import { Input } from '@/components/ui/input';

describe('Input Component', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<Input />);
    expect(getByRole('textbox')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { getByRole } = render(<Input className="custom-class" />);
    expect(getByRole('textbox')).toHaveClass('custom-class');
  });
});
