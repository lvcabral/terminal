# Documentation Index

Welcome to the WebTerminal documentation! This directory contains comprehensive guides for using and developing the WebTerminal.

## User Documentation

### [Color System Guide](colors.md)

Complete documentation for the color features including:

- Contextual coloring and automatic content detection
- Theme management (light/dark)
- Message types with icons
- JSON syntax highlighting
- ANSI escape sequence support
- Built-in color commands
- Configuration options and runtime controls

## Developer Documentation

### [Development Guide](development.md)

Comprehensive guide for developers including:

- Project structure and architecture
- Development workflow and commands
- Adding new features (commands, colors, themes)
- Code style and best practices
- Browser compatibility and performance considerations

### [Testing Guide](testing.md)

Complete testing documentation covering:

- Test structure and organization
- Running tests and coverage reports
- Writing new tests
- Manual testing and debugging
- Testing utilities and best practices

## Quick Reference

### Essential Commands

```bash
# Development
yarn install    # Install dependencies
yarn test       # Run tests
yarn build      # Build project

# Testing
yarn test --watch     # Watch mode
yarn test --coverage  # Coverage report
```

### Key Files

- **`src/WebTerminal.js`** - Main terminal class
- **`src/modules/colors.js`** - Color system engine
- **`src/modules/commands.js`** - Built-in commands
- **`demo.html`** - Interactive demo
- **`test/`** - Test files

### Documentation Files

| File | Purpose |
|------|---------|
| [`colors.md`](colors.md) | Color system features and usage |
| [`development.md`](development.md) | Development workflow and architecture |
| [`testing.md`](testing.md) | Testing setup and procedures |

## Getting Help

- Check the main [README.md](../README.md) for basic usage
- Browse the [demo.html](../demo.html) for interactive examples
- Review test files in [`test/`](../test/) for code examples
- Open issues for bugs or feature requests

## Contributing

When contributing to documentation:

1. Keep content focused and well-organized
2. Include practical examples
3. Update the table of contents when adding sections
4. Follow consistent markdown formatting
5. Test any code examples provided
