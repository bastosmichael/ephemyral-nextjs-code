# Testing Guide for Ephemyral

This document outlines the testing setup and conventions for the Ephemyral project.

## Setup

We use Jest as our testing framework along with React Testing Library for component testing. The setup includes:

- Jest for running tests and assertions
- React Testing Library for rendering and interacting with React components
- TypeScript support for type-checking in tests

## Running Tests

To run the tests, use the following npm scripts:

- `npm test`: Run all tests
- `npm run test:watch`: Run tests in watch mode (re-runs tests on file changes)
- `npm run test:coverage`: Run tests and generate a coverage report

## Test File Structure

Test files should be placed in the `__tests__` directory, mirroring the structure of the `src` directory. For example:

- `__tests__/components/Button.test.tsx` for testing `src/components/Button.tsx`
- `__tests__/utils/someUtility.test.ts` for testing `src/utils/someUtility.ts`

## Writing Tests

### Components

When testing components, focus on the component's behavior and rendered output. Use React Testing Library to query and interact with components as a user would.

Example:

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

test('Button renders with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
});
```

### Utilities and Hooks

For utility functions and custom hooks, test the logic and returned values directly.

Example:

```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from '@/hooks/useCounter';

test('useCounter increases count', () => {
  const { result } = renderHook(() => useCounter());
  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(1);
});
```

## Best Practices

1. Test component behavior, not implementation details.
2. Use meaningful test descriptions that explain the expected behavior.
3. Keep tests isolated and avoid dependencies between tests.
4. Mock external dependencies and API calls.
5. Aim for high test coverage, but prioritize critical paths and edge cases.

## Continuous Integration

Our GitHub Actions workflow automatically runs tests for every pull request and push to the main branch. Ensure all tests pass before merging changes.

## Coverage

We use Jest's built-in coverage reporter. Aim to maintain or improve coverage with each new feature or bug fix. The coverage report is generated in the `coverage` directory after running `npm run test:coverage`.

Remember, while high coverage is good, the quality and relevance of tests are more important than coverage numbers alone.
