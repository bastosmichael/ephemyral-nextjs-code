import { render } from '@testing-library/react';
import NewTemplateForm from '../../../components/templates/new-template-form';
import React from 'react';

describe('NewTemplateForm component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<NewTemplateForm instructions={[]} />);
    expect(getByText('Create Template')).toBeInTheDocument();
  });
});
