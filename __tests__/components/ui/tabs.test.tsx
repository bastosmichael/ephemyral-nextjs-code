import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Add this line if not already included in setup file
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';

describe('Tabs component', () => {
    it('renders correctly', () => {
        const { getByText } = render(
            <Tabs defaultValue="tab1"> {/* Ensure defaultValue is set */}
                <TabsList>
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                    <p>Content for Tab 1</p>
                </TabsContent>
                <TabsContent value="tab2">
                    <p>Content for Tab 2</p>
                </TabsContent>
            </Tabs>
        );

        // Check for tab trigger
        expect(getByText('Tab 1')).toBeInTheDocument();

        // Check for the content of the default active tab
        expect(getByText('Content for Tab 1')).toBeInTheDocument();
    });
});

