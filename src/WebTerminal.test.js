import WebTerminal from './WebTerminal';

global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};

describe('WebTerminal', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="web-terminal"></div>';
  });

  it('default', () => {
    expect(WebTerminal).toBeDefined();

    expect(typeof WebTerminal).toEqual('function');
  });

  it('when instance', () => {
    const term = new WebTerminal();

    expect(term).toBeDefined();
    expect(term.clear).toBeDefined();
    expect(term.onInput).toBeDefined();
    expect(term.output).toBeDefined();
    expect(term.setPrompt).toBeDefined();
  });

  it('when clear()', () => {
    const term = new WebTerminal();

    term.clear();
    expect(document.querySelector('output').innerHTML).toEqual('');
  });

  it('when idle()', () => {
    const term = new WebTerminal();

    term.idle();
    expect(document.querySelector('.command .prompt').innerHTML).toEqual('<div class="spinner"></div>');
  });

  it('when onInput()', () => {
    const mockCallback = jest.fn();
    const term = new WebTerminal();

    term.onInput(mockCallback);
    mockCallback('hello');
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toBe('hello');
  });

  it('when output()', () => {
    const term = new WebTerminal();

    term.output('Hello World');
    expect(document.querySelector('output span:last-child').innerHTML).toEqual('Hello World');
  });

  it('when prompt()', () => {
    const term = new WebTerminal();

    term.prompt('Your name');
    expect(document.querySelector('.command .prompt').innerHTML).toEqual('Your name:');
  });

  it('when setPrompt()', () => {
    const term = new WebTerminal();

    term.setPrompt('Hello World ');
    expect(document.querySelector('.command .prompt').innerHTML).toEqual('Hello World &gt;');
  });

  it('when set another container to instance', () => {
    document.body.innerHTML = '<div id="web-terminal-jest"></div>';
    const term = new WebTerminal({ container: 'web-terminal-jest' });

    expect(term).toBeDefined();
  });

  it('when customized instance', () => {
    const term = new WebTerminal({
      welcome: 'Welcome JEST',
      prompt: 'Testing with JEST ',
      separator: '$',
    });

    expect(term).toBeDefined();
    expect(document.querySelector('output span').innerHTML).toEqual('Welcome JEST');
    expect(document.querySelector('.command .prompt').innerHTML).toEqual('Testing with JEST $');
  });

  it('when add new commands', () => {
    const term = new WebTerminal({
      commands: {
        flavour: (terminal) => {
          terminal.output('There is only one flavor and it is vanilla.')
          terminal.setPrompt('@soyjavi at <u>vanilla</u> ');
        }
      },
    })

    expect(term).toBeDefined();
    expect(term.flavour).not.toBeDefined();
  });
});
