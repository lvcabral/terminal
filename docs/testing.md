# Testing Documentation

This document describes the testing setup and procedures for the WebTerminal project.

## Test Structure

```text
test/
├── setup.js           # Jest test setup and utilities
├── WebTerminal.test.js # Main WebTerminal functionality tests
└── colors.test.js     # Color system tests
```

## Running Tests

```bash
# Install dependencies
yarn install

# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run specific test file
yarn test WebTerminal.test.js
yarn test colors.test.js

# Run tests with coverage
yarn test --coverage
```

## Test Coverage

The project includes comprehensive test coverage for:

- Core terminal functionality (DOM manipulation, event handling)
- Color system and contextual highlighting
- Command processing and custom commands
- Message type formatting
- ANSI escape sequence processing
- Theme switching and runtime controls

## Test Files

### WebTerminal.test.js

Main test suite covering:

- **Basic functionality**: instantiation, configuration options
- **DOM methods**: `clear()`, `output()`, `prompt()`, `setPrompt()`
- **Event handling**: `onInput()`, `onKeyDown()`, keyboard interactions
- **Color integration**: color system configuration and runtime controls
- **Custom commands**: registration and execution

### colors.test.js

Color system test suite covering:

- **Contextual colorization**: automatic detection of numbers, strings, booleans, URLs, etc.
- **JSON syntax highlighting**: object formatting and color application
- **Message types**: error, success, warning, info formatting with icons
- **ANSI support**: escape sequence processing and color helpers
- **Theme switching**: light/dark theme behavior
- **Performance**: color system overhead and efficiency

### setup.js

Test environment configuration providing:

- **Global mocks**: MutationObserver, DOM environment setup
- **Test utilities**: helper functions for common test operations
- **DOM management**: automatic cleanup between tests
- **Color testing tools**: debugging and manual testing utilities

## Test Utilities

The setup file provides several useful testing utilities:

```javascript
// Create a test-friendly terminal instance
const terminal = testUtils.createTestTerminal({ colors: true });

// Get the last output element for inspection
const lastOutput = testUtils.getLastOutput();

// Simulate user input and commands
testUtils.simulateInput(terminal, 'help');

// Run manual color tests for debugging
testUtils.colorUtils.runManualColorTests();
```

## Manual Testing

For debugging color features, you can run manual tests:

```javascript
const testUtils = require('./test/setup.js').testUtils;

// Test contextual coloring
const contextualTests = testUtils.colorUtils.testContextualColors();

// Test JSON syntax highlighting
const jsonTest = testUtils.colorUtils.testJSONColors();

// Test message type formatting
const messageTests = testUtils.colorUtils.testMessageTypes();
```

## Coverage Reports

Test coverage reports are generated in the `build/coverage/` directory:

- **HTML report**: `build/coverage/lcov-report/index.html`
- **JSON data**: `build/coverage/coverage-final.json`
- **Console summary**: Displayed after running `yarn test --coverage`

## Best Practices

When writing tests:

1. **Use descriptive test names** that clearly indicate what functionality is being tested
2. **Clean up DOM state** between tests (handled automatically by setup.js)
3. **Test both enabled and disabled states** for optional features like colors
4. **Include edge cases** like empty inputs, special characters, etc.
5. **Verify DOM changes** when testing output methods
6. **Mock external dependencies** to ensure isolated unit tests

## Continuous Integration

The test suite is designed to run in CI environments with:

- No external dependencies
- Consistent cross-platform behavior
- Fast execution times
- Clear failure reporting

## Writing New Tests

When adding new features:

1. Add unit tests to the appropriate test file
2. Include both positive and negative test cases
3. Test configuration options and runtime changes
4. Verify DOM output and event handling
5. Update this documentation if new test patterns are introduced

## Debugging Tips

- Use `yarn test --watch` for rapid development cycles
- Run individual test files to focus on specific areas
- Check the coverage report to identify untested code paths
- Use the manual color testing utilities for visual debugging
- Enable verbose output with `yarn test --verbose` for detailed test information
