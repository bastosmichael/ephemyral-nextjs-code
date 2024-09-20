import { render } from '@testing-library/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import React from 'react';

describe('Tabs component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Tabs><TabsList><TabsTrigger value="tab1">Tab 1</TabsTrigger></TabsList><TabsContent value="tab1">Content</TabsContent></Tabs>);
        expect(getByText('Tab 1')).toBeInTheDocument();
    });
});
