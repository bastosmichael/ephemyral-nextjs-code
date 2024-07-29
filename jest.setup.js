import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('next/navigation', () => require('next-router-mock'))

// Suppress console errors during tests
console.error = () => {}
