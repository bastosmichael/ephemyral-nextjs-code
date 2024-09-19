import React from 'react';
import { render } from '@testing-library/react';
import { AlertDialog } from '../../components/ui/alert-dialog';

describe('Alert Dialog', () => {
  it('renders the alert dialog correctly', () => {
    const { getByText } = render(
      <AlertDialog open={true} onOpenChange={() => {}}>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Test Title</AlertDialogTitle>
          <AlertDialogDescription>Test description text.</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    );
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test description text.')).toBeInTheDocument();
  });
});
