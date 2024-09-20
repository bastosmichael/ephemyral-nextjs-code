import React from 'react';
import { render } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../components/ui/card';

describe('Card components', () => {
    it('renders Card correctly', () => {
        const { getByText } = render(<Card>Test Card</Card>);
        expect(getByText('Test Card')).toBeInTheDocument();
    });

    it('renders CardHeader correctly', () => {
        const { getByText } = render(<CardHeader>Test Header</CardHeader>);
        expect(getByText('Test Header')).toBeInTheDocument();
    });

    it('renders CardTitle correctly', () => {
        const { getByText } = render(<CardTitle>Test Title</CardTitle>);
        expect(getByText('Test Title')).toBeInTheDocument();
    });

    it('renders CardDescription correctly', () => {
        const { getByText } = render(<CardDescription>Test Description</CardDescription>);
        expect(getByText('Test Description')).toBeInTheDocument();
    });

    it('renders CardContent correctly', () => {
        const { getByText } = render(<CardContent>Test Content</CardContent>);
        expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('renders CardFooter correctly', () => {
        const { getByText } = render(<CardFooter>Test Footer</CardFooter>);
        expect(getByText('Test Footer')).toBeInTheDocument();
    });
});
