import React from 'react';
import { render } from '@testing-library/react';
import { Accordion, AccordionTrigger, AccordionContent } from '../../../components/ui/accordion';

describe('Accordion component', () => {
  it('renders the accordion correctly', () => {
    const { getByText } = render(
      <Accordion>
        <AccordionTrigger>Toggle</AccordionTrigger>
        <AccordionContent>This is the content</AccordionContent>
      </Accordion>
    );
    expect(getByText('Toggle')).toBeInTheDocument();
    expect(getByText('This is the content')).toBeInTheDocument();
  });
});
