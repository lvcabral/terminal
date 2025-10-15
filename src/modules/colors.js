// Color utility functions for WebTerminal with contextual highlighting
export const ANSI_COLORS = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'white',
  90: 'bright-black',
  91: 'bright-red',
  92: 'bright-green',
  93: 'bright-yellow',
  94: 'bright-blue',
  95: 'bright-magenta',
  96: 'bright-cyan',
  97: 'bright-white',
};

// Color themes for different content types
export const COLOR_THEMES = {
  light: {
    number: '#b34700',      // Darker orange for numbers
    string: '#1e7e34',      // Darker green for strings  
    boolean: '#a62c1f',     // Darker red for booleans
    null: '#5a6268',        // Darker gray for null/undefined
    url: '#1c5d8a',         // Darker blue for URLs
    path: '#6c2d91',        // Darker purple for file paths
    command: '#d39e00',     // Darker orange for commands
    error: '#c82333',       // Darker red for errors
    success: '#1e7e34',     // Darker green for success
    warning: '#d39e00',     // Darker orange for warnings
    info: '#1c5d8a',        // Darker blue for info
    prompt: '#1a252f',      // Very dark gray for prompt
    punctuation: '#5a6268', // Darker gray for punctuation
    keyword: '#b34700',     // Darker orange for keywords
    variable: '#6c2d91',    // Darker purple for variables
  },
  
  dark: {
    number: '#fd971f',      // Bright orange
    string: '#a6e22e',      // Bright green
    boolean: '#f92672',     // Bright pink
    null: '#75715e',        // Dark gray
    url: '#66d9ef',         // Cyan
    path: '#ae81ff',        // Light purple
    command: '#e6db74',     // Light yellow
    error: '#f92672',       // Bright pink
    success: '#a6e22e',     // Bright green
    warning: '#fd971f',     // Bright orange
    info: '#66d9ef',        // Cyan
    prompt: '#449dff',      // Blue
    punctuation: '#f8f8f2', // Off-white
    keyword: '#f92672',     // Bright pink
    variable: '#66d9ef',    // Cyan
  }
};

export const ANSI_BG_COLORS = {
  40: 'black',
  41: 'red',
  42: 'green',
  43: 'yellow',
  44: 'blue',
  45: 'magenta',
  46: 'cyan',
  47: 'white',
  100: 'bright-black',
  101: 'bright-red',
  102: 'bright-green',
  103: 'bright-yellow',
  104: 'bright-blue',
  105: 'bright-magenta',
  106: 'bright-cyan',
  107: 'bright-white',
};

export const ANSI_STYLES = {
  1: 'bold',
  2: 'dim',
  3: 'italic',
  4: 'underline',
  9: 'strikethrough',
};

/**
 * Convert ANSI escape sequences to HTML with CSS classes
 * @param {string} text - Text containing ANSI escape sequences
 * @returns {string} HTML with CSS classes for styling
 */
export function ansiToHtml(text) {
  if (!text || typeof text !== 'string') return text;

  // Reset code
  const resetCode = '\x1b[0m';
  
  // Split by ANSI escape sequences
  const ansiRegex = /\x1b\[([0-9;]*)m/g;
  let result = '';
  let lastIndex = 0;
  let currentClasses = [];
  
  let match;
  while ((match = ansiRegex.exec(text)) !== null) {
    // Add text before this escape sequence
    const textBefore = text.slice(lastIndex, match.index);
    if (textBefore) {
      if (currentClasses.length > 0) {
        result += `<span class="${currentClasses.join(' ')}">${textBefore}</span>`;
      } else {
        result += textBefore;
      }
    }
    
    // Parse the ANSI codes
    const codes = match[1].split(';').map(code => parseInt(code, 10)).filter(code => !isNaN(code));
    
    for (const code of codes) {
      if (code === 0) {
        // Reset all styles
        currentClasses = [];
      } else if (ANSI_COLORS[code]) {
        // Remove any existing color classes
        currentClasses = currentClasses.filter(cls => !cls.startsWith('color-'));
        currentClasses.push(`color-${ANSI_COLORS[code]}`);
      } else if (ANSI_BG_COLORS[code]) {
        // Remove any existing background color classes
        currentClasses = currentClasses.filter(cls => !cls.startsWith('bg-'));
        currentClasses.push(`bg-${ANSI_BG_COLORS[code]}`);
      } else if (ANSI_STYLES[code]) {
        // Add style class if not already present
        const styleClass = ANSI_STYLES[code];
        if (!currentClasses.includes(styleClass)) {
          currentClasses.push(styleClass);
        }
      }
    }
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  const remainingText = text.slice(lastIndex);
  if (remainingText) {
    if (currentClasses.length > 0) {
      result += `<span class="${currentClasses.join(' ')}">${remainingText}</span>`;
    } else {
      result += remainingText;
    }
  }
  
  return result;
}

/**
 * Simple color utility functions for easy use
 */
export const colors = {
  black: (text) => `\x1b[30m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  magenta: (text) => `\x1b[35m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  white: (text) => `\x1b[37m${text}\x1b[0m`,
  
  // Bright colors
  brightBlack: (text) => `\x1b[90m${text}\x1b[0m`,
  brightRed: (text) => `\x1b[91m${text}\x1b[0m`,
  brightGreen: (text) => `\x1b[92m${text}\x1b[0m`,
  brightYellow: (text) => `\x1b[93m${text}\x1b[0m`,
  brightBlue: (text) => `\x1b[94m${text}\x1b[0m`,
  brightMagenta: (text) => `\x1b[95m${text}\x1b[0m`,
  brightCyan: (text) => `\x1b[96m${text}\x1b[0m`,
  brightWhite: (text) => `\x1b[97m${text}\x1b[0m`,
  
  // Styles
  bold: (text) => `\x1b[1m${text}\x1b[0m`,
  dim: (text) => `\x1b[2m${text}\x1b[0m`,
  italic: (text) => `\x1b[3m${text}\x1b[0m`,
  underline: (text) => `\x1b[4m${text}\x1b[0m`,
  strikethrough: (text) => `\x1b[9m${text}\x1b[0m`,
};

/**
 * Contextually colorize content based on its type and context
 * @param {string} text - Text to colorize
 * @param {string} theme - Color theme to use ('light' or 'dark')
 * @returns {string} HTML with colored spans
 */
export function contextualColorize(text, theme = 'light') {
  if (!text || typeof text !== 'string') return text;
  
  // Skip colorizing if text already contains HTML tags
  if (/<[^>]*>/g.test(text)) {
    return text;
  }
  
  const colors = COLOR_THEMES[theme] || COLOR_THEMES.light;
  
  // Patterns for different content types
  const patterns = [
    // URLs (must come before file paths)
    {
      regex: /(https?:\/\/[^\s<>"{}|\\^`[\]]+)/g,
      color: colors.url,
      type: 'url'
    },
    
    // File paths (Unix and Windows)
    {
      regex: /([~/]?(?:[a-zA-Z]:)?[/\\]?(?:[^/\\:\s<>"*?|]+[/\\])*[^/\\:\s<>"*?|]*\.[a-zA-Z0-9]+)/g,
      color: colors.path,
      type: 'path'
    },
    
    // Numbers (integers, floats, hex, binary)
    {
      regex: /\b(?:0x[0-9a-fA-F]+|0b[01]+|[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\b/g,
      color: colors.number,
      type: 'number'
    },
    
    // Quoted strings (single and double quotes)
    {
      regex: /(['"])((?:\\.|(?!\1)[^\\])*?)\1/g,
      color: colors.string,
      type: 'string',
      keepQuotes: true
    },
    
    // Boolean values (be more selective to avoid conflicts with status messages)
    {
      regex: /\b(true|false|yes|no)\b(?!\s*(are|is|was|were|currently))/gi,
      color: colors.boolean,
      type: 'boolean'
    },
    
    // Config/status values (only when they appear standalone or in specific contexts)
    {
      regex: /(?:=\s*|:\s*|\btoggle\s+|\bset\s+to\s+)(enabled?|disabled?|on|off)\b/gi,
      color: colors.boolean,
      type: 'boolean'
    },
    
    // Null/undefined values
    {
      regex: /\b(null|undefined|nil|none|empty)\b/gi,
      color: colors.null,
      type: 'null'
    },
    
    // Common keywords
    {
      regex: /\b(function|var|let|const|if|else|for|while|return|class|extends|import|export|from|default)\b/g,
      color: colors.keyword,
      type: 'keyword'
    },
    
    // Command-like patterns (starting with common commands)
    {
      regex: /\b(ls|cd|pwd|mkdir|rm|cp|mv|cat|grep|find|git|npm|yarn|node|python|java|gcc|make|curl|wget)\b/g,
      color: colors.command,
      type: 'command'
    },
    
    // JSON-like object notation
    {
      regex: /([{}\[\]])/g,
      color: colors.punctuation,
      type: 'punctuation'
    },
    
    // Variables (dollar sign prefix or camelCase/snake_case identifiers)
    {
      regex: /(\$[a-zA-Z_][a-zA-Z0-9_]*|\b[a-zA-Z_][a-zA-Z0-9_]*(?=[.\[\(])|[a-zA-Z_][a-zA-Z0-9_]*(?=\s*[:=]))/g,
      color: colors.variable,
      type: 'variable'
    }
  ];
  
  let result = text;
  const replacements = [];
  
  // Find all matches and store them with their positions
  patterns.forEach(pattern => {
    let match;
    const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
    
    while ((match = regex.exec(text)) !== null) {
      replacements.push({
        start: match.index,
        end: match.index + match[0].length,
        original: match[0],
        replacement: `<span style="color: ${pattern.color}">${match[0]}</span>`,
        type: pattern.type,
        priority: getPriority(pattern.type)
      });
    }
  });
  
  // Sort replacements by start position, then by priority (higher priority first)
  replacements.sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    return b.priority - a.priority;
  });
  
  // Remove overlapping replacements (keep higher priority ones)
  const validReplacements = [];
  let lastEnd = 0;
  
  replacements.forEach(replacement => {
    if (replacement.start >= lastEnd) {
      validReplacements.push(replacement);
      lastEnd = replacement.end;
    }
  });
  
  // Apply replacements from end to start to avoid index shifting
  validReplacements.reverse().forEach(replacement => {
    result = result.slice(0, replacement.start) + 
             replacement.replacement + 
             result.slice(replacement.end);
  });
  
  return result;
}

/**
 * Get priority for pattern types (higher numbers = higher priority)
 */
function getPriority(type) {
  const priorities = {
    'url': 10,
    'string': 9,
    'number': 8,
    'path': 7,
    'boolean': 6,
    'null': 5,
    'keyword': 4,
    'command': 3,
    'variable': 2,
    'punctuation': 1
  };
  return priorities[type] || 0;
}

/**
 * Colorize specific message types (error, success, warning, info)
 * @param {string} text - Text to colorize
 * @param {string} type - Message type ('error', 'success', 'warning', 'info')
 * @param {string} theme - Color theme to use
 * @returns {string} Colored HTML
 */
export function colorizeMessageType(text, type, theme = 'light') {
  const colors = COLOR_THEMES[theme] || COLOR_THEMES.light;
  const color = colors[type] || colors.info;
  
  // Add icon based on type
  const icons = {
    error: '❌',
    success: '✅', 
    warning: '⚠️',
    info: 'ℹ️'
  };
  
  const icon = icons[type] || '';
  return `<span style="color: ${color}">${icon} ${text}</span>`;
}

/**
 * Colorize JSON output
 * @param {object|string} obj - Object to colorize or JSON string
 * @param {string} theme - Color theme to use
 * @returns {string} Colored JSON HTML
 */
export function colorizeJSON(obj, theme = 'light') {
  const colors = COLOR_THEMES[theme] || COLOR_THEMES.light;
  
  let jsonString;
  if (typeof obj === 'string') {
    try {
      // Validate and reformat JSON
      jsonString = JSON.stringify(JSON.parse(obj), null, 2);
    } catch (e) {
      jsonString = obj;
    }
  } else {
    jsonString = JSON.stringify(obj, null, 2);
  }
  
  return jsonString
    .replace(/(".*?")\s*:/g, `<span style="color: ${colors.variable}">$1</span>:`)  // Keys
    .replace(/:\s*(".*?")/g, `: <span style="color: ${colors.string}">$1</span>`)   // String values
    .replace(/:\s*(\d+\.?\d*)/g, `: <span style="color: ${colors.number}">$1</span>`) // Numbers
    .replace(/:\s*(true|false)/g, `: <span style="color: ${colors.boolean}">$1</span>`) // Booleans
    .replace(/:\s*(null)/g, `: <span style="color: ${colors.null}">$1</span>`)      // Null
    .replace(/([{}\[\],])/g, `<span style="color: ${colors.punctuation}">$1</span>`); // Punctuation
}

/**
 * Colorize command line output (like ls, ps, etc.)
 * @param {string} text - Command output
 * @param {string} theme - Color theme to use
 * @returns {string} Colored HTML
 */
export function colorizeCommandOutput(text, theme = 'light') {
  const colors = COLOR_THEMES[theme] || COLOR_THEMES.light;
  
  return text
    // File permissions (like drwxr-xr-x)
    .replace(/^([d-])([rwx-]{9})/gm, `<span style="color: ${colors.variable}">$1$2</span>`)
    // File sizes
    .replace(/\b(\d+(?:\.\d+)?[KMGT]?B?)\b/g, `<span style="color: ${colors.number}">$1</span>`)
    // Dates and times
    .replace(/\b(\d{1,2}:\d{2}(?::\d{2})?|\d{4}-\d{2}-\d{2}|\w{3}\s+\d{1,2}\s+\d{1,2}:\d{2})\b/g, 
             `<span style="color: ${colors.info}">$1</span>`)
    // Executable files (common extensions)
    .replace(/\b([^\s]+\.(exe|bin|sh|py|js|jar|app))\b/g, `<span style="color: ${colors.command}">$1</span>`)
    // Directories (words ending with /)
    .replace(/\b([^\s]+\/)\s/g, `<span style="color: ${colors.path}">$1</span> `);
}

/**
 * Create colored output with hex colors
 * @param {string} text - Text to color
 * @param {string} color - Hex color (e.g., '#ff0000' or 'red')
 * @param {string} bgColor - Background hex color (optional)
 * @returns {string} HTML with inline styles
 */
export function colorize(text, color, bgColor) {
  const styles = [];
  if (color) styles.push(`color: ${color}`);
  if (bgColor) styles.push(`background-color: ${bgColor}`);
  
  if (styles.length > 0) {
    return `<span style="${styles.join('; ')}">${text}</span>`;
  }
  return text;
}
