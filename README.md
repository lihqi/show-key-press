# show-key-press

[![NPM version](https://img.shields.io/npm/v/show-key-press.svg?style=flat)](https://npmjs.org/package/show-key-press)
[![NPM downloads](https://img.shields.io/npm/dm/show-key-press.svg?style=flat)](https://npmjs.org/package/show-key-press)

A lightweight key press display tool that shows user keyboard inputs on screen in real-time. Perfect keyboard mapping support for both Mac and Windows systems.

## Features

- 🎯 Real-time key press display
- 💡 Smart detection of key combinations
- 🖥 Auto OS detection and adaptation
- 🎨 Elegant visual effects
- 🔧 Customizable container
- 📦 Zero dependencies
- 📱 ESModule support for modern development

## Installation

```bash
npm install show-key-press

# or
yarn add show-key-press

# or
pnpm add show-key-press
```

## Module Format

show-key-press is distributed as an ESModule package for modern development workflows:

```javascript
// ESM
import { ShowKeyPress } from 'show-key-press';
```

## Usage

```javascript
import { ShowKeyPress } from 'show-key-press';

// Create instance
const keyPress = new ShowKeyPress();

// Initialize styles
keyPress.init();

// Start listening to key events
keyPress.start();

// Stop listening and cleanup
keyPress.destroy();
```

## Options

```typescript
interface ShowKeyPressOptions {
  // Specify OS type, auto-detect by default
  os?: 'mac' | 'win';
  
  // Custom container element, defaults to document.body
  el?: HTMLElement;
}
```

### Basic Example

```javascript
// Custom configuration
const keyPress = new ShowKeyPress({
  os: 'mac', // Force Mac key mapping
  el: document.querySelector('#my-container') // Custom display container
});
```

### Vue Integration

```vue
<template>
  <div ref="keyContainer"></div>
</template>

<script>
import { ShowKeyPress } from 'show-key-press';
import { onMounted, onBeforeUnmount, ref } from 'vue';

export default {
  setup() {
    const keyContainer = ref(null);
    let keyPress;

    onMounted(() => {
      keyPress = new ShowKeyPress({
        el: keyContainer.value
      });
      keyPress.init();
      keyPress.start();
    });

    onBeforeUnmount(() => {
      keyPress?.destroy();
    });

    return {
      keyContainer
    };
  }
};
</script>
```

### React Integration

```jsx
import { useEffect, useRef } from 'react';
import { ShowKeyPress } from 'show-key-press';

function KeyPressDisplay() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const keyPress = new ShowKeyPress({
      el: containerRef.current
    });
    
    keyPress.init();
    keyPress.start();
    
    return () => {
      keyPress.destroy();
    };
  }, []);
  
  return <div ref={containerRef} />;
}

export default KeyPressDisplay;
```

## API

### `init()`
Initialize the required styles for key display.

### `start()`
Start listening to keyboard events and display key presses.

### `destroy()`
Stop listening to keyboard events and cleanup resources.

## Style Customization

The component uses CSS selectors that you can override for customization:

```css
/* Container style */
[data-keys] {
  /* Your custom styles */
}

/* Key style */
[data-keys] [data-key] {
  /* Your custom styles */
}
```

## Browser Support

- Chrome >= 49
- Firefox >= 52
- Safari >= 10
- Edge >= 14

## License

[MIT](LICENSE)

## Contributing

Issues and Pull Requests are welcome!

## Changelog

### 0.0.1-alpha.1
- 🎉 Initial release
- ✨ Basic key display functionality
- 🔧 Mac/Win system adaptation