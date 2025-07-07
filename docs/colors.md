# Color System Documentation

WebTerminal supports sophisticated colored output with contextual highlighting. It automatically detects and colorizes different types of content like numbers, strings, URLs, file paths, and more - similar to syntax highlighting in modern code editors.

## Features

- **Contextual Coloring** - Automatic detection and coloring of:
  - Numbers (integers, floats, hex, binary)
  - Strings (quoted text)
  - Booleans (true/false, yes/no, enabled/disabled)
  - URLs and file paths
  - Commands and keywords
  - Variables and identifiers
  - JSON syntax highlighting
  - Command output formatting
- **Multiple Themes** - Light and dark color schemes
- **Message Types** - Built-in error, success, warning, and info styling
- **ANSI Color Code Support** - Standard terminal escape sequences

## Quick Start

```js
// Create terminal with colors enabled (default)
const terminal = new WebTerminal({
  colors: true,          // Enable contextual coloring
  colorTheme: 'light'    // Color theme: 'light' or 'dark'
});
```

## Content Type Detection

The terminal automatically detects and colors different content types:

| Content Type | Color | Examples |
|--------------|-------|----------|
| Numbers | Orange | `123`, `3.14`, `0xFF`, `0b1010` |
| Strings | Green | `"hello"`, `'world'`, `` `template` `` |
| Booleans | Red | `true`, `false`, `yes`, `no`, `enabled` |
| URLs | Blue | `https://example.com`, `http://localhost:3000` |
| File Paths | Purple | `/etc/config`, `./src/app.js`, `C:\Windows` |
| Commands | Yellow | `npm`, `git`, `ls`, `cd`, `docker` |
| Variables | Purple | `$PATH`, `camelCase`, `snake_case` |
| Keywords | Orange | `function`, `if`, `for`, `class` |
| Null values | Gray | `null`, `undefined`, `nil` |

## Usage Examples

### Basic Output

```js
// Numbers, strings, booleans are automatically colored
terminal.output('Port: 3000, Debug: true, Name: "MyApp"');

// URLs and file paths get special colors
terminal.output('Config: /etc/myapp/config.json, API: https://api.example.com');

// Commands and variables are highlighted
terminal.output('Run: npm install, Environment: $NODE_ENV');
```

### Message Types

```js
// Built-in message types with icons and colors
terminal.error('Something went wrong!');      // ❌ Red
terminal.warning('This is a warning');        // ⚠️ Orange  
terminal.success('Operation completed!');     // ✅ Green
terminal.info('Here is some information');    // ℹ️ Blue
```

### JSON Syntax Highlighting

```js
// Automatic JSON syntax highlighting
terminal.outputJSON({
  user: "john",
  id: 123,
  active: true,
  roles: ["admin", "user"]
});
```

### Command Output Formatting

```js
// Colored command output (like ls, ps, etc.)
terminal.outputCommand('drwxr-xr-x  5 user  staff   160B Mar 15 10:30 src/');
```

## Runtime Controls

```js
// Toggle coloring at runtime
terminal.setColors(true);              // Enable colors
terminal.setColors(false);             // Disable colors

// Change themes
terminal.setColorTheme('dark');        // Switch to dark theme
terminal.setColorTheme('light');       // Switch to light theme
```

## Built-in Commands

```bash
# Color control commands
> colors                    # Show current color status and help
> colors on                 # Enable colors
> colors off                # Disable colors  
> colors demo               # Show comprehensive color examples

# Theme commands  
> theme light               # Switch to light theme
> theme dark                # Switch to dark theme

# Example commands that showcase contextual coloring
> ls                        # Colored directory listing
> json                      # JSON syntax highlighting demo
> env                       # Environment variables with coloring
> ps                        # Process list with colored output
```

## ANSI Color Support

Traditional ANSI escape sequences are fully supported:

```js
// Direct ANSI escape sequences
terminal.output('\x1b[31mRed text\x1b[0m');
terminal.output('\x1b[1;34mBold blue text\x1b[0m');

// Using the built-in color helpers
terminal.output(terminal.colors.red('Red text'));
terminal.output(terminal.colors.bold('Bold text'));
```

**Available colors**: black, red, green, yellow, blue, magenta, cyan, white, bright variants  
**Available styles**: bold, dim, italic, underline, strikethrough

## Custom Colors

```js
// Use hex colors or CSS color names
terminal.output(terminal.colorize('Orange text', '#ff6600'));
terminal.output(terminal.colorize('Text with background', '#fff', '#333'));

// Use ANSI color utilities  
terminal.output(terminal.colors.red('Red text'));
terminal.output(terminal.colors.bold('Bold text'));
terminal.output(terminal.colors.blue('Blue') + ' and ' + terminal.colors.green('Green'));
```

## Configuration Options

```js
const terminal = new WebTerminal({
  colors: true,        // Enable contextual coloring (default: true)
  colorTheme: 'light'  // Color theme: 'light' or 'dark' (default: 'light')
});
```

## Themes

### Light Theme (Default)

Web-friendly colors optimized for light backgrounds with a light gray background:

- Numbers: Dark orange (#d35400)
- Strings: Dark green (#27ae60)
- URLs: Dark blue (#2980b9)
- Commands: Orange (#f39c12)
- Background: Light gray (#f8f9fa)
- Text: Dark blue-gray (#2c3e50)

### Dark Theme

Terminal-like colors optimized for dark backgrounds with a dark background:

- Numbers: Light orange (#fd971f)
- Strings: Light green (#a6e22e)
- URLs: Light cyan (#66d9ef)
- Commands: Light yellow (#e6db74)
- Background: Dark gray (#222222)
- Text: Light gray (#dddddd)

## Performance

- Zero impact when colors are disabled
- Efficient regex-based pattern matching
- Minimal DOM manipulation overhead
- Lazy color processing

## API Reference

### Color Utility Functions

The terminal exposes ANSI color utility functions through `terminal.colors`:

```js
// Basic colors
terminal.colors.red(text)       // Red text
terminal.colors.green(text)     // Green text  
terminal.colors.blue(text)      // Blue text
terminal.colors.yellow(text)    // Yellow text
terminal.colors.magenta(text)   // Magenta text
terminal.colors.cyan(text)      // Cyan text
terminal.colors.white(text)     // White text
terminal.colors.black(text)     // Black text

// Bright colors
terminal.colors.brightRed(text)     // Bright red
terminal.colors.brightGreen(text)   // Bright green
terminal.colors.brightBlue(text)    // Bright blue
// ... etc

// Styles
terminal.colors.bold(text)          // Bold text
terminal.colors.dim(text)           // Dim text
terminal.colors.italic(text)        // Italic text
terminal.colors.underline(text)     // Underlined text
terminal.colors.strikethrough(text) // Strikethrough text
```

### Custom Color Function

```js
terminal.colorize(text, color, backgroundColor)
```

- `text`: Text to colorize
- `color`: Hex color (e.g., '#ff0000') or CSS color name
- `backgroundColor`: Optional background color
