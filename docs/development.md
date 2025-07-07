# Development Documentation

This document provides information for developers working on the WebTerminal project.

## Project Structure

```text
terminal/
├── src/                    # Source code
│   ├── WebTerminal.js     # Main terminal class
│   ├── WebTerminal.css    # Terminal styles and color classes
│   ├── index.js           # Entry point
│   └── modules/           # Modular components
│       ├── colors.js      # Color system engine
│       ├── commands.js    # Built-in commands
│       ├── help.js        # Help system
│       ├── cloneCommandNode.js # Command parsing utilities
│       ├── markup.js      # HTML/markup utilities
│       └── index.js       # Module exports
├── test/                  # Test files
│   ├── WebTerminal.test.js # Main functionality tests
│   ├── colors.test.js     # Color system tests
│   └── setup.js           # Test configuration
├── docs/                  # Documentation
│   ├── colors.md          # Color system documentation
│   ├── testing.md         # Testing documentation
│   └── development.md     # This file
├── demo.html              # Interactive demo
├── minimal-test.html      # Minimal test environment
├── dist/                  # Built files (generated)
├── build/                 # Build artifacts (generated)
├── package.json           # Dependencies and scripts
├── jest.config.js         # Test configuration
├── webpack.config.js      # Build configuration
└── README.md              # Main documentation
```

## Development Workflow

### Initial Setup

```bash
# Clone the repository
git clone [repository-url]
cd terminal

# Install dependencies
yarn install

# Run tests to verify setup
yarn test
```

### Development Commands

```bash
# Build the project
yarn build

# Run tests
yarn test

# Run tests in watch mode (for development)
yarn test --watch

# Run tests with coverage report
yarn test --coverage

# Clean build artifacts
yarn clean
```

### Building

The project uses Webpack to build a UMD bundle:

- **Input**: `src/index.js`
- **Output**: `dist/web-terminal.js` and `dist/web-terminal.min.js`
- **Format**: UMD (works in browsers, Node.js, AMD, CommonJS)

### File Organization

#### Core Files

- **`src/WebTerminal.js`**: Main terminal class with all core functionality
- **`src/WebTerminal.css`**: Styles, color classes, and responsive design
- **`src/index.js`**: Entry point that exports the WebTerminal class

#### Modules

- **`src/modules/colors.js`**: Contextual color system with theme support
- **Core commands in `src/modules/commands.js`:**

- **`clear`**: Clear terminal screen
- **`help`**: Show available commands and help text
- **`version`**: Display terminal version
- **`wipe`**: Clear command history
- **`colors`**: Control color settings (on/off/demo)
- **`theme`**: Switch color themes (light/dark)

**Demo commands** (in example files only):

- `ls`, `json`, `env`, `ps` - These are custom commands defined in the example files to showcase color features
- **`src/modules/help.js`**: Help text generation and formatting
- **`src/modules/cloneCommandNode.js`**: Command parsing utilities
- **`src/modules/markup.js`**: HTML markup and text processing
- **`src/modules/index.js`**: Exports all modules for easy importing

## Architecture

### WebTerminal Class

The main `WebTerminal` class handles:

- DOM manipulation and event handling
- Command processing and execution
- Input/output management
- Color system integration
- Configuration and runtime options

### Color System

The color system (`src/modules/colors.js`) provides:

- Contextual content detection using regex patterns
- Theme management (light/dark)
- ANSI escape sequence processing
- Message type formatting (error, success, warning, info)
- Performance-optimized color application

### Command System

Commands are handled through:

- Built-in commands in `src/modules/commands.js`
- Custom command registration via constructor options
- Command parsing and parameter extraction
- Help text generation

## Adding New Features

### Adding a New Built-in Command

1. Add the command function to `src/modules/commands.js`:

```javascript
export const myCommand = (terminal, params) => {
  terminal.output('My command output');
};
```

2. Register it in the commands object:

```javascript
export const commands = {
  // ...existing commands...
  'my-command': myCommand
};
```

3. Add help text in `src/modules/help.js`

4. Write tests in `test/WebTerminal.test.js`

### Adding New Color Detection

1. Add regex pattern to `src/modules/colors.js`:

```javascript
const PATTERNS = {
  // ...existing patterns...
  myPattern: /your-regex-here/g
};
```

2. Add color application logic:

```javascript
const colorizeContent = (text, theme) => {
  // ...existing logic...
  text = text.replace(PATTERNS.myPattern, (match) => 
    colorSpan(match, getColor('myColor', theme))
  );
  return text;
};
```

3. Add tests in `test/colors.test.js`

### Adding New Themes

1. Define theme colors in `src/modules/colors.js`:

```javascript
const COLORS = {
  light: {
    // ...existing colors...
    myColor: '#your-color'
  },
  dark: {
    // ...existing colors...  
    myColor: '#your-dark-color'
  }
};
```

2. Update CSS classes in `src/WebTerminal.css` if needed

3. Test with both themes

## Code Style

- Use ES6+ features (modules, arrow functions, destructuring)
- Follow consistent indentation (2 spaces)
- Use descriptive variable and function names
- Add JSDoc comments for public APIs
- Keep functions focused and modular

## Testing Guidelines

- Write unit tests for all new functionality
- Test both positive and negative cases
- Include edge cases and error conditions
- Mock DOM interactions appropriately
- Aim for high test coverage

## Performance Considerations

- Color processing is optimized for minimal DOM manipulation
- Regex patterns are compiled once and reused
- Event listeners are properly managed
- Memory leaks are prevented through proper cleanup

## Browser Compatibility

The terminal is designed to work in:

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Legacy browser support through polyfills if needed

## Debugging

### Common Issues

1. **Colors not showing**: Check if colors are enabled and theme is set correctly
2. **Commands not working**: Verify command registration and parameter parsing
3. **DOM issues**: Ensure container element exists and is accessible
4. **Event handling**: Check for proper event listener setup and cleanup

### Debugging Tools

- Use browser dev tools for DOM inspection
- Run `yarn test --coverage` to check test coverage
- Use the demo files for manual testing
- Enable verbose logging in development builds

## Contributing

When contributing:

1. Create feature branches from main
2. Write tests for new functionality
3. Update documentation as needed
4. Follow the existing code style
5. Ensure all tests pass before submitting

## Release Process

1. Update version in `package.json`
2. Run full test suite
3. Build production bundle
4. Update CHANGELOG.md
5. Create git tag
6. Publish to npm (if applicable)
