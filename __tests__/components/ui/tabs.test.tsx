import React from 'react';
import { render } from '@testing-library/react';
import { Tabs } from '../../../components/ui/tabs';

describe('Tabs component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Tabs><Tabs.List><Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger></Tabs.List></Tabs>);
        expect(getByText('Tab 1')).toBeInTheDocument();
    });
});
