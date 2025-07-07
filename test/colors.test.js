/**
 * Color functionality tests
 */
import { 
  contextualColorize, 
  colorizeJSON, 
  colorizeMessageType,
  colorize,
  colors as colorHelpers,
  ansiToHtml 
} from '../src/modules/colors';

describe('Color System', () => {
  describe('contextualColorize', () => {
    it('should colorize numbers', () => {
      const result = contextualColorize('Port: 3000');
      expect(result).toContain('3000');
      expect(result).toContain('color:');
    });

    it('should colorize strings', () => {
      const result = contextualColorize('Name: "WebTerminal"');
      expect(result).toContain('"WebTerminal"');
      expect(result).toContain('color:');
    });

    it('should colorize booleans', () => {
      const result = contextualColorize('Debug: true, SSL: false');
      expect(result).toContain('true');
      expect(result).toContain('false');
      expect(result).toContain('color:');
    });

    it('should colorize URLs', () => {
      const result = contextualColorize('Visit https://example.com');
      expect(result).toContain('https://example.com');
      expect(result).toContain('color:');
    });

    it('should colorize file paths', () => {
      const result = contextualColorize('Config: /etc/app/config.json');
      expect(result).toContain('/etc/app/config.json');
      expect(result).toContain('color:');
    });

    it('should handle empty or invalid input', () => {
      expect(contextualColorize('')).toBe('');
      expect(contextualColorize(null)).toBe(null);
      expect(contextualColorize(undefined)).toBe(undefined);
    });

    it('should use different themes', () => {
      const defaultResult = contextualColorize('Number: 42', 'default');
      const darkResult = contextualColorize('Number: 42', 'dark');
      
      expect(defaultResult).toContain('42');
      expect(darkResult).toContain('42');
      // Both should have color styling but potentially different colors
      expect(defaultResult).toContain('color:');
      expect(darkResult).toContain('color:');
    });
  });

  describe('colorizeJSON', () => {
    it('should colorize JSON objects', () => {
      const testObj = {
        name: "test",
        value: 42,
        active: true,
        data: null
      };
      
      const result = colorizeJSON(testObj);
      expect(result).toContain('"name"');
      expect(result).toContain('"test"');
      expect(result).toContain('42');
      expect(result).toContain('true');
      expect(result).toContain('null');
      expect(result).toContain('color:');
    });

    it('should handle JSON strings', () => {
      const jsonString = '{"key": "value", "number": 123}';
      const result = colorizeJSON(jsonString);
      expect(result).toContain('"key"');
      expect(result).toContain('"value"');
      expect(result).toContain('123');
    });

    it('should handle invalid JSON strings gracefully', () => {
      const invalidJson = '{invalid json}';
      const result = colorizeJSON(invalidJson);
      // Should still contain the original text, but may have some formatting
      expect(result).toContain('invalid json');
      expect(result).toContain('{');
      expect(result).toContain('}');
    });
  });

  describe('colorizeMessageType', () => {
    it('should add icons and colors for error messages', () => {
      const result = colorizeMessageType('Something went wrong', 'error');
      expect(result).toContain('❌');
      expect(result).toContain('Something went wrong');
      expect(result).toContain('color:');
    });

    it('should add icons and colors for success messages', () => {
      const result = colorizeMessageType('Success!', 'success');
      expect(result).toContain('✅');
      expect(result).toContain('Success!');
      expect(result).toContain('color:');
    });

    it('should add icons and colors for warning messages', () => {
      const result = colorizeMessageType('Warning!', 'warning');
      expect(result).toContain('⚠️');
      expect(result).toContain('Warning!');
      expect(result).toContain('color:');
    });

    it('should add icons and colors for info messages', () => {
      const result = colorizeMessageType('Information', 'info');
      expect(result).toContain('ℹ️');
      expect(result).toContain('Information');
      expect(result).toContain('color:');
    });

    it('should handle unknown message types', () => {
      const result = colorizeMessageType('Unknown', 'unknown');
      expect(result).toContain('Unknown');
      expect(result).toContain('color:');
      // Should not contain specific icons for unknown types
      expect(result).not.toContain('❌');
      expect(result).not.toContain('✅');
    });
  });

  describe('colorize', () => {
    it('should apply foreground color', () => {
      const result = colorize('test', '#ff0000');
      expect(result).toContain('test');
      expect(result).toContain('color: #ff0000');
    });

    it('should apply background color', () => {
      const result = colorize('test', null, '#00ff00');
      expect(result).toContain('test');
      expect(result).toContain('background-color: #00ff00');
    });

    it('should apply both colors', () => {
      const result = colorize('test', '#ff0000', '#00ff00');
      expect(result).toContain('test');
      expect(result).toContain('color: #ff0000');
      expect(result).toContain('background-color: #00ff00');
    });

    it('should return text as-is when no colors provided', () => {
      const result = colorize('test');
      expect(result).toBe('test');
    });
  });

  describe('ansiToHtml', () => {
    it('should convert ANSI color codes to HTML', () => {
      const result = ansiToHtml('\x1b[31mRed text\x1b[0m');
      expect(result).toContain('Red text');
      expect(result).toContain('color-red');
    });

    it('should handle multiple color codes', () => {
      const result = ansiToHtml('\x1b[31mRed\x1b[0m \x1b[32mGreen\x1b[0m');
      expect(result).toContain('Red');
      expect(result).toContain('Green');
      expect(result).toContain('color-red');
      expect(result).toContain('color-green');
    });

    it('should handle text without ANSI codes', () => {
      const plainText = 'Plain text';
      const result = ansiToHtml(plainText);
      expect(result).toBe(plainText);
    });

    it('should handle empty or invalid input', () => {
      expect(ansiToHtml('')).toBe('');
      expect(ansiToHtml(null)).toBe(null);
      expect(ansiToHtml(undefined)).toBe(undefined);
    });
  });

  describe('colorHelpers', () => {
    it('should provide color helper functions', () => {
      expect(colorHelpers.red).toBeDefined();
      expect(colorHelpers.green).toBeDefined();
      expect(colorHelpers.blue).toBeDefined();
      expect(colorHelpers.bold).toBeDefined();
    });

    it('should generate ANSI codes', () => {
      const result = colorHelpers.red('test');
      expect(result).toContain('\x1b[31m');
      expect(result).toContain('test');
      expect(result).toContain('\x1b[0m');
    });
  });

  // Test the integrated color utilities from setup.js
  describe('testUtils.colorUtils', () => {
    it('should provide contextual color testing', () => {
      const results = testUtils.colorUtils.testContextualColors();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
      expect(results[0]).toHaveProperty('input');
      expect(results[0]).toHaveProperty('output');
      expect(results[0]).toHaveProperty('hasColors');
    });

    it('should provide JSON color testing', () => {
      const result = testUtils.colorUtils.testJSONColors();
      expect(result).toHaveProperty('input');
      expect(result).toHaveProperty('output');
      expect(result).toHaveProperty('hasColors');
      expect(result.hasColors).toBe(true);
    });

    it('should provide message type testing', () => {
      const results = testUtils.colorUtils.testMessageTypes();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(4); // error, success, warning, info
      expect(results[0]).toHaveProperty('type');
      expect(results[0]).toHaveProperty('output');
      expect(results[0]).toHaveProperty('hasIcon');
    });

    it('should provide manual testing function', () => {
      expect(typeof testUtils.colorUtils.runManualColorTests).toBe('function');
      // Just ensure it doesn't throw when called
      expect(() => testUtils.colorUtils.runManualColorTests()).not.toThrow();
    });
  });
});
