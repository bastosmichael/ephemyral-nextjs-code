import React from 'react';
import { render } from '@testing-library/react';
import { ResizablePanelGroup } from '../../../components/ui/resizable';

describe('Resizable Panel Group', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <ResizablePanelGroup>
        <div>Panel 1</div>
        <div>Panel 2</div>
      </ResizablePanelGroup>
    );
    expect(getByText('Panel 1')).toBeInTheDocument();
    expect(getByText('Panel 2')).toBeInTheDocument();
  });
});
