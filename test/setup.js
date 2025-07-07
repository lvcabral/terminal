/**
 * Test setup configuration for WebTerminal tests
 */

// Setup global MutationObserver mock for tests
global.MutationObserver = class {
  constructor(callback) {
    this.callback = callback;
  }
  disconnect() {}
  observe(element, initObject) {}
};

// Global test utilities
global.testUtils = {
  // Helper to create a terminal with test-friendly defaults
  createTestTerminal: (options = {}) => {
    const WebTerminal = require('../src/WebTerminal').default;
    return new WebTerminal({
      colors: false, // Disable colors by default for testing
      welcome: '', // No welcome message for cleaner tests
      ...options
    });
  },
  
  // Helper to get the last output span
  getLastOutput: () => {
    return document.querySelector('output span:last-child');
  },
  
  // Helper to simulate user input
  simulateInput: (terminal, command) => {
    terminal.DOM.input.value = command;
    terminal.onKeyDown({ keyCode: 13 });
  },

  // Color testing utilities
  colorUtils: {
    // Test contextual colorization
    testContextualColors: () => {
      const { contextualColorize } = require('../src/modules/colors');
      
      const testCases = [
        'Port: 3000, Debug: true, Name: "WebTerminal"',
        'URLs: https://github.com/user/repo',
        'File paths: /home/user/documents/file.txt, ./src/index.js',
        'Commands: ls -la, git status, npm install',
        'Variables: $HOME, $PATH, userName, configFile',
        'Numbers: 42, 3.14, 0xFF, 0b1010',
        'Booleans: true, false, yes, no, enabled, disabled',
        'Null values: null, undefined, nil, none'
      ];
      
      return testCases.map(text => ({
        input: text,
        output: contextualColorize(text),
        hasColors: contextualColorize(text).includes('color:')
      }));
    },

    // Test JSON colorization
    testJSONColors: () => {
      const { colorizeJSON } = require('../src/modules/colors');
      
      const testData = {
        name: "WebTerminal",
        version: "0.1.0", 
        port: 3000,
        ssl: false,
        features: ["colors", "contextual"],
        config: null
      };
      
      return {
        input: testData,
        output: colorizeJSON(testData),
        hasColors: colorizeJSON(testData).includes('color:')
      };
    },

    // Test message types
    testMessageTypes: () => {
      const { colorizeMessageType } = require('../src/modules/colors');
      
      const types = ['error', 'success', 'warning', 'info'];
      return types.map(type => ({
        type,
        output: colorizeMessageType(`This is a ${type} message`, type),
        hasIcon: colorizeMessageType(`Test ${type}`, type).includes('️')
      }));
    },

    // Manual color testing function for debugging
    runManualColorTests: () => {
      console.log('=== WebTerminal Color System Tests ===\n');
      
      console.log('1. Contextual Coloring:');
      testUtils.colorUtils.testContextualColors().forEach(test => {
        console.log(`Input: ${test.input}`);
        console.log(`Output: ${test.output}`);
        console.log(`Has Colors: ${test.hasColors}\n`);
      });
      
      console.log('2. JSON Coloring:');
      const jsonTest = testUtils.colorUtils.testJSONColors();
      console.log(`Input: ${JSON.stringify(jsonTest.input)}`);
      console.log(`Output: ${jsonTest.output}`);
      console.log(`Has Colors: ${jsonTest.hasColors}\n`);
      
      console.log('3. Message Types:');
      testUtils.colorUtils.testMessageTypes().forEach(test => {
        console.log(`${test.type}: ${test.output}`);
        console.log(`Has Icon: ${test.hasIcon}\n`);
      });
      
      console.log('Color functionality test completed!');
    }
  }
};
