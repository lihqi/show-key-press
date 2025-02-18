import '@testing-library/jest-dom';
import { ShowKeyPress } from '../index';
import { macKeyMap, winKeyMap } from '../constant';


describe('ShowKeyPress', () => {
  let keyPress: ShowKeyPress;
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    keyPress = new ShowKeyPress({ el: container });
  });

  afterEach(() => {
    keyPress.destroy();
    container.remove();
    document.head.querySelector('#keyscss')?.remove();
  });

  it('should initialize with default options', () => {
    const defaultKeyPress = new ShowKeyPress();
    expect(defaultKeyPress).toBeTruthy();
  });

  it('should initialize with custom container', () => {
    keyPress.init();
    const style = document.head.querySelector('#keyscss');
    expect(style).toBeInTheDocument();
  });

  it('should handle single key press', () => {
    keyPress.init();
    keyPress.start();

    const event = new KeyboardEvent('keydown', {
      key: 'A',
      bubbles: true,
    });
    window.dispatchEvent(event);

    const keysElement = container.querySelector('[data-keys]');
    expect(keysElement).toBeInTheDocument();
    expect(keysElement?.textContent?.trim()).toBe('A');
  });

  it('should handle modifier keys', () => {
    keyPress.init();
    keyPress.start();

    const event = new KeyboardEvent('keydown', {
      key: 'A',
      metaKey: true,
      shiftKey: true,
      bubbles: true,
    });
    window.dispatchEvent(event);

    const keysElement = container.querySelector('[data-keys]');
    expect(keysElement).toBeInTheDocument();
    const keyElements = container.querySelectorAll('[data-key]');
    expect(keyElements.length).toBe(3); // Meta + Shift + A
  });

  it('should cleanup properly on destroy', () => {
    keyPress.init();
    keyPress.start();
    keyPress.destroy();

    const style = document.head.querySelector('#keyscss');
    const keysElement = container.querySelector('[data-keys]');
    expect(style).not.toBeInTheDocument();
    expect(keysElement).not.toBeInTheDocument();
  });

  it('should use correct key mapping based on OS', () => {
    const macKeyPress = new ShowKeyPress({ os: 'mac' });
    const winKeyPress = new ShowKeyPress({ os: 'win' });

    expect(macKeyPress['prettyMap']).toBe(macKeyMap);
    expect(winKeyPress['prettyMap']).toBe(winKeyMap);
  });

  it('should ignore key events from input elements', () => {
    keyPress.init();
    keyPress.start();

    const input = document.createElement('input');
    container.appendChild(input);

    const event = new KeyboardEvent('keydown', {
      key: 'A',
      bubbles: true,
    });
    input.dispatchEvent(event);

    const keysElement = container.querySelector('[data-keys]');
    expect(keysElement).not.toBeInTheDocument();
  });
});
