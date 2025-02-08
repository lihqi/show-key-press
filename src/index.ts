import { macKeyMap, winKeyMap } from "./constant";

interface ShowKeyPressOptions {
  el?: HTMLElement | Element | null;
  os?: "win" | "mac";
}

class ShowKeyPress {
  private keys: string[] = [];
  private appearedAt: Date | null = null;
  private timeoutId: number | null = null;
  private container: HTMLElement | Element | null = null;
  private options: ShowKeyPressOptions;

  private get prettyMap() {
    return this.options.os === "mac" ? macKeyMap : winKeyMap;
  }

  constructor(options: ShowKeyPressOptions = {}) {
    this.options = {
      os:
        typeof navigator !== "undefined" &&
        navigator.platform.toLowerCase().includes("mac")
          ? "mac"
          : "win",
      ...options,
    };
  }

  init(): void {
    this.insertCSS();
  }

  start(): void {
    window.addEventListener("keydown", this.handler);
  }

  destroy(): void {
    window.removeEventListener("keydown", this.handler);
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    this.container?.remove();
    const style = document.head.querySelector("#keyscss");
    style?.remove();
  }

  private handler = (event: KeyboardEvent): void => {
    if (["INPUT", "TEXTAREA"].includes((event.target as HTMLElement).tagName)) {
      return;
    }

    const key =
      (this.prettyMap as Record<string, string>)[event.key] ||
      event.key.toUpperCase();

    const modifiers = {
      Meta: event.metaKey,
      Shift: event.shiftKey,
      Alt: event.altKey,
      Control: event.ctrlKey,
    };

    const newKeys = Object.entries(modifiers)
      .filter(([_, isPressed]) => isPressed)
      .map(
        ([modifier]) => this.prettyMap[modifier as keyof typeof this.prettyMap]
      );

    if (!Object.keys(modifiers).includes(event.key)) {
      newKeys.push(key);
    }

    this.keys = newKeys;
    this.appearedAt = new Date();
    this.render();
    this.dismissAfterTimeout();
  };

  private dismissAfterTimeout(): void {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }

    this.timeoutId = window.setTimeout(() => {
      if (!this.appearedAt) return;

      const elapsed = new Date().getTime() - this.appearedAt.getTime();
      if (elapsed < 1000) {
        this.dismissAfterTimeout();
      } else {
        this.keys = [];
        this.render();
      }
    }, 1000);
  }

  private insertCSS(): void {
    if (!document.head.querySelector("#keyscss")) {
      const style = document.createElement("style");
      style.id = "keyscss";
      style.textContent = `
          [data-keys] {
            display: flex;
            background: #2e2e2e;
            border-radius: 10px;
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 10px 12px;
            font-size: 24px;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
              Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            animation: keys-zoom-in 50ms;
          }
          [data-keys][data-children="0"] { opacity: 0; }
          [data-keys] [data-key] + [data-key] { margin-left: 10px; }
          [data-keys] [data-key] {
            height: 54px;
            min-width: 54px;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #2e2e2e;
            background: linear-gradient(#fff, #dadada);
            border-radius: 5px;
            border-top: 1px solid #f5f5f5;
            box-shadow: inset 0 0 25px #e8e8e8, 0 1px 0 #c3c3c3, 0 4px 0 #c9c9c9;
            text-shadow: 0px 1px 0px #f5f5f5;
          }
          @keyframes keys-zoom-in {
            from { transform: scale(0.9); }
            to { }
          }
        `;
      document.head.appendChild(style);
    }
  }

  private render(): void {
    if (this.keys.length === 0) {
      this.container?.remove();
      this.container = null;
    } else {
      if (!this.container) {
        this.container = document.createElement("div");
        this.container.setAttribute("data-keys", "");
        const parent = this.options.el || document.body;
        parent.appendChild(this.container);
      }

      this.container.innerHTML = `
        ${this.keys.map((key) => `<div data-key>${key}</div>`).join("")}
      `;
    }
  }
}
export { ShowKeyPress };

export default ShowKeyPress;
