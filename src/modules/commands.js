import PKG from '../../package.json';
import HELP from './help';

const { localStorage } = window;
const KEY = 'WebTerm';

export default {
  clear: terminal => terminal.clear(),

  help: (terminal, [command]) => {
    if (command) {
      terminal.output(`help: ${HELP[command] || `no help topics match <u>${command}</u>`}`);
    } else {
      terminal.output('These shell commands are defined internally. Type <u>help</u> for see the list.');
      terminal.output('Type <u>help name</u> to find out more about the function <u>name</u>.');
      terminal.output(Object.keys(terminal.commands).join(', '));
    }
  },

  version: terminal => terminal.output(`Simple Web Terminal v${PKG.version}`),

  wipe: (terminal) => {
    terminal.prompt('Are you sure remove all your commands history? Y/N', (value) => {
      if (value.trim().toUpperCase() === 'Y') {
        localStorage.removeItem(KEY);
        terminal.history = []; // eslint-disable-line
        terminal.historyCursor = 0; // eslint-disable-line
        terminal.output('History of commands wiped.');
      }
    });
  },

  colors: (terminal, [action]) => {
    if (action === 'off') {
      terminal.setContextualColors(false);
      terminal.output('Colors disabled.');
    } else if (action === 'on') {
      terminal.setContextualColors(true);
      terminal.output('Colors enabled.');
    } else if (action === 'demo') {
      if (!terminal.contextualColors) {
        terminal.error('Colors are disabled. Use "colors on" to enable them first.');
        return;
      }
      
      terminal.info('=== Color Demonstration ===');
      
      // Contextual coloring examples
      terminal.output('Numbers: 42, 3.14, 0xFF, 0b1010');
      terminal.output('Strings: "hello world", \'single quotes\'');
      terminal.output('Booleans: true, false, yes, no');
      terminal.output('Null values: null, undefined, nil, none');
      terminal.output('URLs: https://github.com/user/repo');
      terminal.output('File paths: /home/user/documents/file.txt, ./src/index.js');
      terminal.output('Commands: ls -la, git status, npm install');
      terminal.output('Variables: $HOME, $PATH, userName, configFile');
      
      // JSON example
      terminal.output('\nJSON output:');
      terminal.outputJSON({
        name: "WebTerminal",
        version: "1.0.0",
        features: ["colors", "themes"],
        enabled: true,
        settings: {
          theme: "light",
          autoComplete: false
        }
      });
      
      // Message types
      terminal.output('\nMessage types:');
      terminal.error('This is an error message');
      terminal.warning('This is a warning message');
      terminal.success('This is a success message');
      terminal.info('This is an info message');
      
    } else {
      terminal.output('Colors are currently ' + (terminal.contextualColors ? 'enabled' : 'disabled'));
      terminal.output('Current theme: ' + terminal.colorTheme);
      terminal.output('');
      terminal.output('Usage: colors [command]');
      terminal.output('Commands:');
      terminal.output('  on     - Enable colored output');
      terminal.output('  off    - Disable colored output');
      terminal.output('  demo   - Show color examples');
      terminal.output('');
      terminal.output('Use "theme" command to change themes');
      terminal.output('Try demo files for more examples (ls, json, env, ps)');
    }
  },

  theme: (terminal, [themeName]) => {
    if (!themeName) {
      terminal.output('Current theme: ' + terminal.colorTheme);
      terminal.output('Available themes: light, dark');
      terminal.output('Usage: theme <name>');
    } else if (['light', 'dark'].includes(themeName)) {
      terminal.setColorTheme(themeName);
      terminal.success(`Theme changed to: ${themeName}`);
    } else {
      terminal.error(`Unknown theme: ${themeName}`);
      terminal.output('Available themes: light, dark');
    }
  },
};
