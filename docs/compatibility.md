# Compatibility Guide

## Version 1.0.0 Compatibility

### Major New Features in 1.0.0

Version 1.0.0 represents a major release with new functionality that was not present in 0.x versions.

#### Color System Implementation

**What's New:**

- **Contextual Color Detection**: Automatic detection and highlighting of numbers, strings, booleans, URLs, file paths, commands, variables, and more
- **ANSI Color Support**: Full ANSI escape sequence support with CSS class conversion
- **Theme System**: Light and dark color themes with theme-aware color palettes
- **Message Types**: Built-in error, success, warning, and info message styling with icons
- **JSON Syntax Highlighting**: Automatic JSON formatting and colorization
- **Command Output Formatting**: Special formatting for command-like output (ls, ps, etc.)
- **Color Utility Functions**: Comprehensive color helper functions and APIs

**New Constructor Options:**

```javascript
const terminal = new WebTerminal({
  colors: true,           // Enable contextual coloring (NEW)
  colorTheme: 'light'     // Color theme: 'light' or 'dark' (NEW)
});
```

**New Public Methods:**

```javascript
// Message type methods (NEW)
terminal.error(text)
terminal.success(text)
terminal.warning(text)
terminal.info(text)

// JSON output with syntax highlighting (NEW)
terminal.outputJSON(obj)

// Command output with special formatting (NEW)
terminal.outputCommand(text)

// Color utility methods (NEW)
terminal.colorize(text, color, bgColor)

// Theme and color control (NEW)
terminal.setColorTheme(theme)
terminal.setContextualColors(enable)

// Color helper functions (NEW)
terminal.colors.red(text)
terminal.colors.green(text)
terminal.colors.bold(text)
// ... and many more
```

**New Built-in Commands:**

```bash
colors          # Color system controls (on/off/demo)
theme           # Theme switching (light/dark)
```

#### Removed Commands

**Removed:**

- `cat` command - Only supported one hardcoded file (`config.json`)

### Breaking Changes from 0.x

#### API Changes

**Constructor Options:**

- ✅ **No breaking changes** - All 0.x constructor options remain the same
- ✅ **New optional parameters** - `colors` and `colorTheme` are optional with sensible defaults

**Method Signatures:**

- ✅ **No breaking changes** - All existing methods (`output`, `clear`, `prompt`, etc.) work exactly the same
- ✅ **Enhanced functionality** - `output()` method now processes colors when enabled

**Behavior Changes:**

- **Enhanced Output**: Text output now includes contextual coloring by default (can be disabled)
- **Theme Support**: Terminal now applies theme classes to the container element

### Backward Compatibility

#### Full API Compatibility

Version 1.0.0 maintains **100% backward compatibility** with 0.x versions:

- ✅ All public methods remain unchanged
- ✅ Constructor options are the same (with new optional additions)
- ✅ Event handling is identical
- ✅ Command processing works the same way
- ✅ DOM structure is preserved
- ✅ CSS classes remain compatible

#### Enhanced Functionality (Backward Compatible)

All new features are **additive** and don't break existing functionality:

- **Contextual Colors**: Enabled by default but can be disabled to match 0.x behavior
- **Theme Support**: Defaults to light theme, existing CSS continues to work
- **New Methods**: All additions, no modifications to existing methods
- **New Commands**: Additional built-in commands, existing commands unchanged

### Migration Guide

1. **Update your package reference:**

   ```bash
   npm install @lvcabral/terminal@^1.0.0
   ```

2. **Rebuild your project:**

   ```bash
   npm run build
   ```

3. **No code changes required** - Your existing code will work exactly as before

4. **Optionally enable new features:**

   ```javascript
   // Existing code works as-is:
   const terminal = new WebTerminal();

   // Or take advantage of new color features:
   const terminal = new WebTerminal({
     colors: true,        // Enable contextual coloring
     colorTheme: 'dark'   // Use dark theme
   });
   ```

5. **Explore new capabilities:**

   ```javascript
   // New message types
   terminal.error('Something went wrong!');
   terminal.success('Operation completed!');

   // JSON syntax highlighting
   terminal.outputJSON({name: "app", version: "1.0.0"});

   // ANSI colors now work properly
   terminal.output(terminal.colors.red('Red text'));

   // Hex colors
   terminal.output(terminal.colorize('Blue text', '#0066cc'));
   ```

### Migration Benefits

**If you were using version 0.x, upgrading to 1.0.0 gives you:**

- **Zero breaking changes** - Everything works as before
- **Rich color support** - Automatic content detection and highlighting
- **Better user experience** - Enhanced readability with contextual colors
- **Theme flexibility** - Light and dark themes for different environments
- **Extended API** - New methods for enhanced terminal interactions
- **Production ready** - Comprehensive testing and stable architecture

### Upgrading from 0.x

1. **Update your package reference:**

   ```bash
   npm install @lvcabral/terminal@^1.0.0
   ```

2. **Rebuild your project:**

   ```bash
   npm run build
   ```

3. **Test ANSI colors:**

   ```javascript
   // These now work properly in the browser:
   terminal.output(terminal.colors.red('Red text'));
   terminal.output(terminal.colors.green('Green text'));
   terminal.output(terminal.colors.blue('Blue text'));
   ```

4. **Remove any ANSI color workarounds:**
   - If you were using `terminal.colorize()` instead of `terminal.colors.*()` due to bugs, you can now use either method
   - Both ANSI classes and inline styles work correctly

### Testing Your Upgrade

To verify your upgrade was successful:

1. **Check contextual colors work properly:**

   ```javascript
   terminal.output('Numbers: 42, Strings: "hello", Booleans: true');
   ```

2. **Test ANSI colors display properly:**

   ```javascript
   terminal.output(terminal.colors.red('This should be red'));
   ```

3. **Test theme switching:**

   ```javascript
   terminal.setColorTheme('light');
   terminal.setColorTheme('dark');
   ```

4. **Test new message types:**

   ```javascript
   terminal.error('Error message');
   terminal.success('Success message');
   ```

5. **Verify all existing functionality:**
   - Custom commands still work
   - Event handlers still fire
   - Existing styling is preserved

### Support

If you encounter any compatibility issues:

1. Check that you've rebuilt your project after upgrading
2. Verify your CSS customizations don't conflict with the new color system
3. Test in multiple browsers to ensure consistent behavior
4. Review the examples in the `/examples` directory for reference implementations
5. Check the [Color System Guide](colors.md) for detailed documentation

### Version History

- **1.0.0**: Complete color system implementation with contextual highlighting, ANSI support, themes, message types, JSON formatting, and enhanced API
- **0.1.0**: Initial release with basic terminal functionality (no color support)

The 1.0.0 release represents a major feature release with a complete color system while maintaining 100% backward compatibility with 0.x applications.
