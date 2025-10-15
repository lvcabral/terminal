# Simple Web Terminal

[![NPM Version](https://img.shields.io/npm/v/%40lvcabral%2Fterminal)](https://www.npmjs.com/package/@lvcabral/terminal)
[![GitHub](https://img.shields.io/github/license/lvcabral/terminal)](./LICENSE)

> A simple and lightweight Javascript web browser terminal

<img src='./images/simple-web-terminal.gif' />

Web apps are great. But sometimes instead of all the double-clicks, mouse pointers, taps and swipes across the screen - you just want good old keyboard input. This terminal runs in a browser, desktop or mobile. It provides a simple and easy way to extend the terminal with your own commands.

## How to use

Include `web-terminal.js` in your HTML:

```html
<script src="web-terminal.min.js"></script>
```

Define an HTML div tag where the terminal will be contained:

```html
<div id="web-terminal"></div>
```

Create a new terminal instance and convert the DOM element into a live terminal.

```js
const terminal = new WebTerminal();
```

If you want use another DOM element as container just set the property `container`:

```js
const terminal = new WebTerminal({ container: 'my-terminal-container' });
```

### Add your own commands

If you want add your own commands to the terminal just pass a object using the *property* as your command and the *value* as the callback.

```js
const commands = {
  switch: (terminal) => {
    terminal.output('This is a custom command of <b>web terminal<b>.')
    terminal.setPrompt('Custom Prompt &gt; ');
  },

  ping: (instance, parameters) => {
    instance.output('Ping to <u>${parameters[0]}</u>...');
  },
};

const terminal = new WebTerminal({ commands });
```

Now in your terminal could type your new commands:

```bash
> help
These shell commands are defined internally:
flavour, ping, clear, help, version, wipe

> switch
This is a custom command of web terminal.
Custom Prompt >
```

## Color Support

WebTerminal includes sophisticated colored output with contextual highlighting that automatically detects and colorizes different types of content - similar to syntax highlighting in modern code editors.

### Quick Start

```js
// Create terminal with colors enabled (default)
const terminal = new WebTerminal({
  colors: true,        // Enable contextual coloring
  colorTheme: 'light'  // Color theme: 'light' or 'dark'
});
```

### Key Features

- **Contextual Coloring** - Automatic detection of numbers, strings, booleans, URLs, file paths, commands, and more
- **Multiple Themes** - Light and dark color schemes  
- **Message Types** - Built-in error, success, warning, and info styling with icons
- **JSON Syntax Highlighting** - Automatic formatting for JSON objects
- **ANSI Support** - Standard terminal escape sequences
- **Runtime Controls** - Toggle colors and themes on-the-fly

### Example Usage

```js
// Automatic contextual coloring
terminal.output('Server running on port 3000 with debug=true');

// Message types with icons  
terminal.success('File saved successfully!');
terminal.error('Connection failed');

// JSON highlighting
terminal.outputJSON({name: "app", version: "1.0.0"});

// Built-in commands
> colors demo    # Show color examples
> theme dark     # Switch to dark theme

// Demo commands (available in examples)
> ls             # Directory listing (in demo files)
> json           # JSON example (in demo files)
```

**📖 For complete color documentation, see [`docs/colors.md`](docs/colors.md)**

**🎨 For live examples, see [`examples/`](examples/) folder**

## Methods

### clear

```js
terminal.clear();
```

### output

```js
terminal.output('I like ice-cream.');
```

```bash
I like ice-cream.
>
```

### prompt

```js
terminal.prompt('Type your name', (name) => {
  terminal.output(`Hi ${name}!`);
});
```

```bash
Type your name: javi
Hi javi!
>
```

### onInput

```js
terminal.onInput((command, parameters) => {
  console.log('⚡️onInput', command, parameters);
});
```

### setPrompt

```js
terminal.setPrompt('user @ web');
```

```bash
user @ web >
```

## Development

### Getting Started

```bash
# Install dependencies
yarn install

# Run tests
yarn test

# Build the project  
yarn build
```

### Project Structure

```text
terminal/
├── src/                    # Source code
│   ├── WebTerminal.js     # Main terminal class
│   ├── WebTerminal.css    # Terminal styles
│   ├── index.js           # Entry point
│   └── modules/           # Modular components
├── docs/                  # Documentation
│   ├── colors.md          # Color system guide
│   ├── testing.md         # Testing documentation
│   └── development.md     # Development guide
├── test/                  # Test files
├── examples/              # Demo files and examples
└── dist/                  # Built files
```

### Documentation

- **📖 [Color System Guide](docs/colors.md)** - Comprehensive color features documentation
- **🧪 [Testing Guide](docs/testing.md)** - Test setup, running tests, and writing new tests  
- **⚙️ [Development Guide](docs/development.md)** - Architecture, contributing, and advanced topics
- **🔄 [Compatibility Guide](docs/compatibility.md)** - Version compatibility and migration information

### Testing

The project includes comprehensive test coverage for:

- Core terminal functionality
- Color system and contextual highlighting
- Command processing and custom commands
- DOM manipulation and event handling

## License

This repository is a fork from the [https://github.com/soyjavi/vanilla-terminal](vanilla-terminal) and is licensed under the [MIT License](/LICENSE).
