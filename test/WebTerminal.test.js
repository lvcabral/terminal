import WebTerminal from "../src/WebTerminal";

global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};

describe("WebTerminal", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="web-terminal"></div>';
  });

  it("default", () => {
    expect(WebTerminal).toBeDefined();

    expect(typeof WebTerminal).toEqual("function");
  });

  it("when instance", () => {
    const term = new WebTerminal();

    expect(term).toBeDefined();
    expect(term.clear).toBeDefined();
    expect(term.onInput).toBeDefined();
    expect(term.output).toBeDefined();
    expect(term.setPrompt).toBeDefined();
  });

  it("when clear()", () => {
    const term = new WebTerminal();

    term.clear();
    expect(document.querySelector("output").innerHTML).toEqual("");
  });

  it("when idle()", () => {
    const term = new WebTerminal();

    term.idle();
    expect(document.querySelector(".command .prompt").innerHTML).toEqual(
      '<div class="spinner"></div>'
    );
  });

  it("when onInput()", () => {
    const mockCallback = jest.fn();
    const term = new WebTerminal();

    term.onInput(mockCallback);
    mockCallback("hello");
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toBe("hello");
  });

  it("when output()", () => {
    const term = new WebTerminal({ colors: false }); // Disable colors for this test

    term.output("Hello World");
    expect(document.querySelector("output span:last-child").innerHTML).toEqual("Hello World");
  });

  it("when prompt()", () => {
    const term = new WebTerminal();

    term.prompt("Your name");
    expect(document.querySelector(".command .prompt").innerHTML).toEqual("Your name:");
  });

  it("when setPrompt()", () => {
    const term = new WebTerminal();

    term.setPrompt("Hello World ");
    expect(document.querySelector(".command .prompt").innerHTML).toEqual("Hello World &gt;");
  });

  it("when set another container to instance", () => {
    document.body.innerHTML = '<div id="web-terminal-jest"></div>';
    const term = new WebTerminal({ container: "web-terminal-jest" });

    expect(term).toBeDefined();
  });

  it("when customized instance", () => {
    const term = new WebTerminal({
      welcome: "Welcome JEST",
      prompt: "Testing with JEST ",
      separator: "$",
    });

    expect(term).toBeDefined();
    expect(document.querySelector("output span").innerHTML).toEqual("Welcome JEST");
    expect(document.querySelector(".command .prompt").innerHTML).toEqual("Testing with JEST $");
  });

  it("when add new commands", () => {
    const mockCallback = jest.fn();
    const commands = { custom: mockCallback };
    const term = new WebTerminal({ commands });

    // Set the input value and simulate keydown
    term.DOM.input.value = "custom";
    term.onKeyDown({ keyCode: 13 });
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  // Color functionality tests
  describe("Color functionality", () => {
    it("should support disabling colors", () => {
      const term = new WebTerminal({ colors: false });
      expect(term.contextualColors).toBe(false);
    });

    it("should support enabling colors by default", () => {
      const term = new WebTerminal();
      expect(term.contextualColors).toBe(true);
    });

    it("should support color themes", () => {
      const term = new WebTerminal({ colorTheme: "dark" });
      expect(term.colorTheme).toBe("dark");
    });

    it("should default to light theme", () => {
      const term = new WebTerminal();
      expect(term.colorTheme).toBe("light");
    });

    it("should output colored text when colors enabled", () => {
      const term = new WebTerminal({ colors: true });
      // Just test that the method completes without error
      expect(() => term.output("Number: 42")).not.toThrow();

      // Test that the contextual colorization is enabled
      expect(term.contextualColors).toBe(true);
    });

    it("should support message types", () => {
      const term = new WebTerminal({ colors: true });
      // Test that message type methods exist and don't throw
      expect(() => term.error("Test error")).not.toThrow();
      expect(() => term.success("Test success")).not.toThrow();
      expect(() => term.warning("Test warning")).not.toThrow();
      expect(() => term.info("Test info")).not.toThrow();
    });

    it("should toggle colors at runtime", () => {
      const term = new WebTerminal({ colors: true });
      expect(term.contextualColors).toBe(true);
      term.setContextualColors(false);
      expect(term.contextualColors).toBe(false);
    });

    it("should apply theme CSS classes", () => {
      const term = new WebTerminal({ colorTheme: "light" });
      expect(term.DOM.el.classList.contains("theme-light")).toBe(true);
    });

    it("should switch theme CSS classes", () => {
      const term = new WebTerminal({ colorTheme: "light" });
      expect(term.DOM.el.classList.contains("theme-light")).toBe(true);

      term.setColorTheme("dark");
      expect(term.DOM.el.classList.contains("theme-dark")).toBe(true);
      expect(term.DOM.el.classList.contains("theme-light")).toBe(false);
    });

    it("should expose color utility functions", () => {
      const term = new WebTerminal();
      expect(typeof term.colors).toBe("object");
      expect(typeof term.colors.red).toBe("function");
      expect(typeof term.colors.bold).toBe("function");
      expect(typeof term.colorize).toBe("function");
    });

    it("should have working color utility functions", () => {
      const term = new WebTerminal();
      const redText = term.colors.red("test");
      expect(redText).toContain("\x1b[31m");
      expect(redText).toContain("test");
      expect(redText).toContain("\x1b[0m");

      const colorizedText = term.colorize("test", "#ff0000");
      expect(colorizedText).toContain("color: #ff0000");
      expect(colorizedText).toContain("test");
    });

    it("should change theme and update existing text colors", () => {
      const term = new WebTerminal({ colorTheme: "dark", contextualColors: true });

      // Add some output with colors
      term.output("Number: 42");
      term.output("URL: https://example.com");

      // Get the spans with inline color styles
      const outputSpans = term.DOM.output.querySelectorAll('span[style*="color"]');
      expect(outputSpans.length).toBeGreaterThan(0);

      // Store initial color from first span
      const firstSpan = outputSpans[0];
      const initialStyle = firstSpan.getAttribute("style");

      // Change theme
      term.setColorTheme("light");

      // Verify theme changed
      expect(term.colorTheme).toBe("light");
      expect(term.DOM.el.classList.contains("theme-light")).toBe(true);
      expect(term.DOM.el.classList.contains("theme-dark")).toBe(false);

      // Verify the color in the style attribute changed
      const updatedStyle = firstSpan.getAttribute("style");
      expect(updatedStyle).not.toBe(initialStyle);
    });
  });
});
