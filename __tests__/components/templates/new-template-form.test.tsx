import { render } from '@testing-library/react';
import NewTemplateForm from '../../../components/templates/new-template-form';

describe('NewTemplateForm component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<NewTemplateForm instructions={[]} />);
    expect(getByText('Create Template')).toBeInTheDocument();
  });
});
