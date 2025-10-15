/* global MutationObserver */

import {
  cloneCommandNode,
  COMMANDS,
  markup,
  ansiToHtml,
  colors,
  colorize,
  contextualColorize,
  colorizeMessageType,
  colorizeJSON,
  colorizeCommandOutput,
  COLOR_THEMES,
} from "./modules";
import style from "./WebTerminal.css"; // eslint-disable-line

const KEY = "WebTerm";

const { addEventListener, localStorage } = window;

class Terminal {
  constructor(props = {}) {
    const {
      container = "web-terminal",
      commands = {},
      welcome = 'Welcome to the simple <a href="">Web Terminal</a>.',
      prompt = "",
      separator = "&gt;",
      ignoreBadCommand = false,
      autoFocus = true,
      colors: contextualColors = true,
      colorTheme = "light",
    } = props;
    this.commands = Object.assign({}, COMMANDS, commands);
    this.history = localStorage[KEY] ? JSON.parse(localStorage[KEY]) : [];
    this.historyCursor = this.history.length;
    this.welcome = welcome;
    this.shell = { prompt, separator };
    this.ignoreBadCommand = ignoreBadCommand;
    this.autoFocus = autoFocus;
    this.contextualColors = contextualColors;
    this.colorTheme = colorTheme;
    this.colors = colors; // Expose color utility functions
    this.colorize = colorize; // Expose colorize function

    const el = document.getElementById(container);
    if (el) {
      this.cacheDOM(el);
      this.addListeners();
      if (welcome) this.output(welcome);
    } else throw Error(`Container #${container} doesn't exists.`);
  }

  state = {
    prompt: undefined,
    idle: undefined,
  };

  cacheDOM = (el) => {
    el.classList.add(KEY);
    el.classList.add(`theme-${this.colorTheme}`);
    el.insertAdjacentHTML("beforeEnd", markup(this));

    // Cache DOM nodes
    const container = el.querySelector(".container");
    this.DOM = {
      container,
      output: container.querySelector("output"),
      command: container.querySelector(".command"),
      input: container.querySelector(".command .input"),
      prompt: container.querySelector(".command .prompt"),
      el, // Store reference to main element for theme switching
    };
  };

  addListeners = () => {
    const { DOM, autoFocus } = this;

    // Create a MutationObserver to observe changes in the output element
    const observer = new MutationObserver(() => {
      setTimeout(() => DOM.input.scrollIntoView(), 10);
    });

    // Start observing the output element for child list changes
    observer.observe(DOM.output, { childList: true, subtree: true });

    DOM.output.addEventListener("click", (event) => event.stopPropagation(), false);
    DOM.input.addEventListener("keyup", this.onKeyUp, false);
    DOM.input.addEventListener("keydown", this.onKeyDown, false);
    DOM.command.addEventListener("click", () => DOM.input.focus(), false);

    if (autoFocus) {
      addEventListener("click", () => DOM.input.focus(), false);

      addEventListener(
        "keyup",
        (event) => {
          DOM.input.focus();
          event.stopPropagation();
          event.preventDefault();
        },
        false
      );
    }
  };

  onKeyUp = (event) => {
    const { keyCode } = event;
    const { DOM, history = [], historyCursor } = this;

    if (keyCode === 27) {
      // ESC key
      DOM.input.value = "";
      event.stopPropagation();
      event.preventDefault();
    } else if ([38, 40].includes(keyCode)) {
      if (keyCode === 38 && historyCursor > 0) this.historyCursor -= 1; // {38} UP key
      if (keyCode === 40 && historyCursor < history.length - 1) this.historyCursor += 1; // {40} DOWN key

      if (history[this.historyCursor]) DOM.input.value = history[this.historyCursor];
    }
  };

  onKeyDown = ({ keyCode }) => {
    const { commands = {}, DOM, history, onInputCallback, state } = this;
    const commandLine = DOM.input.value.trim();
    if (keyCode !== 13 || !commandLine) return;

    const [command, ...parameters] = commandLine.split(" ");

    if (state.prompt) {
      state.prompt = false;
      this.onAskCallback(command);
      this.setPrompt();
      this.resetCommand();
      return;
    }

    // Save command line in history
    history.push(commandLine);
    localStorage[KEY] = JSON.stringify(history);
    this.historyCursor = history.length;

    // Clone command as a new output line
    DOM.output.appendChild(cloneCommandNode(DOM.command));

    // Clean command line
    DOM.command.classList.add("hidden");
    DOM.input.value = "";

    // Dispatch command
    let handled = false;
    if (Object.keys(commands).includes(command)) {
      const callback = commands[command];
      if (callback) {
        callback(this, parameters);
        handled = true;
      }
    } else if (!this.ignoreBadCommand) {
      this.output(`<u>${command}</u>: command not found.`);
    }
    if (onInputCallback) onInputCallback(command, parameters, handled);
  };

  resetCommand = () => {
    const { DOM } = this;

    DOM.input.value = "";
    DOM.command.classList.remove("input");
    DOM.command.classList.remove("hidden");
    if (DOM.input.scrollIntoView) DOM.input.scrollIntoView();
  };

  clear() {
    this.DOM.output.innerHTML = "";
    if (!this.state.idle) {
      this.DOM.input.focus();
    }
    this.resetCommand();
  }

  idle() {
    const { DOM } = this;

    DOM.command.classList.add("idle");
    DOM.prompt.innerHTML = '<div class="spinner"></div>';
  }

  prompt(prompt, callback = () => {}) {
    this.state.prompt = true;
    this.onAskCallback = callback;
    this.DOM.prompt.innerHTML = `${prompt}:`;
    this.resetCommand();
    this.DOM.command.classList.add("input");
  }

  onInput(callback) {
    this.onInputCallback = callback;
  }

  // Output raw HTML without any processing (useful for pre-formatted HTML content)
  outputHTML(html = "&nbsp;") {
    this.DOM.output.insertAdjacentHTML("beforeEnd", `<span>${html}</span>`);
    this.scrollDown();
  }

  output(html = "&nbsp;", type = null) {
    let processedHtml = html;

    // Process colors if enabled
    if (this.contextualColors && typeof html === "string") {
      // Handle specific message types first
      if (type && ["error", "success", "warning", "info"].includes(type)) {
        processedHtml = colorizeMessageType(html, type, this.colorTheme);
      }
      // Then apply contextual coloring
      else {
        // First process ANSI codes, then contextual coloring
        processedHtml = ansiToHtml(html);
        if (processedHtml === html) {
          // Only apply contextual if no ANSI codes were processed
          processedHtml = contextualColorize(processedHtml, this.colorTheme);
        }
      }
    } else if (typeof html === "string") {
      // If colors are disabled, still process ANSI codes to avoid showing raw escape sequences
      processedHtml = ansiToHtml(html);
      if (processedHtml === html) {
        // No ANSI codes found, escape HTML to prevent injection
        processedHtml = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }
    }

    this.DOM.output.insertAdjacentHTML("beforeEnd", `<span>${processedHtml}</span>`);
    this.resetCommand();
  }

  // Output JSON with syntax highlighting
  outputJSON(obj) {
    if (!this.contextualColors) {
      this.output(JSON.stringify(obj, null, 2));
      return;
    }
    this.output(colorizeJSON(obj, this.colorTheme));
  }

  // Output command results with contextual coloring
  outputCommand(text) {
    if (!this.contextualColors) {
      this.output(text);
      return;
    }
    this.output(colorizeCommandOutput(text, this.colorTheme));
  }

  setPrompt(prompt = this.shell.prompt) {
    const {
      DOM,
      shell: { separator },
    } = this;

    this.shell = { prompt, separator };
    DOM.command.classList.remove("idle");
    DOM.prompt.innerHTML = `${prompt}${separator}`;
    DOM.input.focus();
  }

  // Color utility methods
  colorize(text, color, bgColor) {
    if (!this.contextualColors) return text;
    return colorize(text, color, bgColor);
  }

  // Convenience methods for message types
  error(text) {
    this.output(text, "error");
  }

  success(text) {
    this.output(text, "success");
  }

  warning(text) {
    this.output(text, "warning");
  }

  info(text) {
    this.output(text, "info");
  }

  // Method to change color theme
  setColorTheme(theme) {
    if (COLOR_THEMES[theme]) {
      const oldTheme = this.colorTheme;
      const oldColors = COLOR_THEMES[oldTheme];
      const newColors = COLOR_THEMES[theme];

      // Remove old theme class
      this.DOM.el.classList.remove(`theme-${this.colorTheme}`);

      // Set new theme
      this.colorTheme = theme;

      // Add new theme class
      this.DOM.el.classList.add(`theme-${this.colorTheme}`);

      // Update all existing inline styles in the output to use new theme colors
      if (this.contextualColors && oldColors && newColors) {
        const outputSpans = this.DOM.output.querySelectorAll('span[style*="color"]');
        outputSpans.forEach((span) => {
          const currentStyle = span.getAttribute("style");
          if (currentStyle) {
            let updatedStyle = currentStyle;

            // Replace each old theme color with the corresponding new theme color
            Object.keys(oldColors).forEach((colorKey) => {
              const oldColor = oldColors[colorKey];
              const newColor = newColors[colorKey];

              // Escape special regex characters in the color value (e.g., # in hex colors)
              const escapedOldColor = oldColor.replace(/[#().]/g, "\\$&");

              // Match the color in the style attribute (case-insensitive)
              const colorRegex = new RegExp(`color:\\s*${escapedOldColor}`, "gi");
              updatedStyle = updatedStyle.replace(colorRegex, `color: ${newColor}`);
            });

            span.setAttribute("style", updatedStyle);
          }
        });
      }
    }
  }

  // Method to toggle contextual coloring
  setContextualColors(enable) {
    this.contextualColors = enable;
  }
}

if (window) window.WebTerminal = Terminal;

export default Terminal;
