import React from 'react';
import { render } from '@testing-library/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';

describe('Tabs component', () => {
  it('renders the tabs correctly', () => {
    const { getByText } = render(
      <Tabs>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );
    expect(getByText('Tab 1')).toBeInTheDocument();
    expect(getByText('Content 1')).toBeInTheDocument();
  });
});
