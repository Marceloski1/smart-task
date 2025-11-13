# SmartTask Tests

This directory contains all test files for the SmartTask application.

## Test Structure

- `components/` - Component tests using React Testing Library
- `lib/` - Unit tests for utilities, store, and type validation

## Running Tests

\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
\`\`\`

## Coverage Goals

- Components: > 80%
- Utilities: > 90%
- Store: > 85%

## Writing Tests

Follow these guidelines when writing tests:

1. Use descriptive test names
2. Test user interactions, not implementation details
3. Mock external dependencies
4. Keep tests isolated and independent
5. Use data-testid for complex queries when necessary

## Test Examples

### Component Test
\`\`\`tsx
it('renders component correctly', () => {
  render(<MyComponent />)
  expect(screen.getByText('Expected Text')).toBeInTheDocument()
})
\`\`\`

### Store Test
\`\`\`tsx
it('updates state correctly', () => {
  const { result } = renderHook(() => useStore())
  act(() => {
    result.current.updateValue('new value')
  })
  expect(result.current.value).toBe('new value')
})
\`\`\`

### Schema Test
\`\`\`tsx
it('validates data correctly', () => {
  const result = MySchema.safeParse(validData)
  expect(result.success).toBe(true)
})
