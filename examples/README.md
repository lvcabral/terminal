# WebTerminal Examples

This directory contains various example implementations of the WebTerminal.

## Examples

### [basic-demo.html](basic-demo.html)

Simple example showing basic terminal functionality with custom commands and light theme.

### [demo.html](demo.html)

Comprehensive color demonstration showcasing all the contextual coloring features.

### [theme-demo.html](theme-demo.html)

Side-by-side comparison of light and dark themes with automated demonstrations.

## Running Examples

Since the examples reference the built file (`../dist/web-terminal.js`), make sure to build the project first:

```bash
# From the project root
yarn build
```

Then open any of the HTML files in your browser:

```bash
# Using a local server (recommended)
python -m http.server 8000
# Then visit http://localhost:8000/examples/

# Or open directly in browser
open examples/demo.html
```

## What to Try

### Core Commands (available in all terminals)

- `help` - Show available commands
- `colors demo` - Comprehensive color demonstration
- `theme light` or `theme dark` - Switch themes
- `clear` - Clear the terminal
- `version` - Show terminal version

### Demo Commands (available in example files)

- `ls` - Simulated directory listing with colors
- `json` - JSON syntax highlighting example
- `env` - Environment variables display
- `ps` - Process list with colored output
- `rainbow` - Rainbow text using ANSI colors
- `ansi` - ANSI escape sequence examples
- `demo` - Custom contextual coloring demonstration

Note: The demo commands (`ls`, `json`, `env`, `ps`, `rainbow`, `ansi`, `demo`) are custom commands defined in the example files, not part of the core WebTerminal library.

## Creating Custom Examples

To create your own example:

1. Copy one of the existing files
2. Modify the WebTerminal configuration
3. Add custom commands as needed
4. Update the path to `../dist/web-terminal.js`

Example configuration:

```javascript
const terminal = new WebTerminal({
    container: 'my-terminal',
    colorTheme: 'light',              // or 'dark'
    colors: true,                     // enable contextual coloring
    welcome: 'Welcome to my terminal!',
    commands: {
        // Custom commands
        hello: (terminal) => terminal.success('Hello World!')
    }
});
```
