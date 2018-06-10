# EventHandle

Simple event system with closures.

```js
import EventHandle from 'event-handle';

// Create an event.
let demoStarted = EventHandle.create();
console.log('isEventHandle: ', EventHandle.isEventHandle(demoStarted));

// Create a handler.
let remove = demoStarted.handle(
  (...args) => console.log('Handled event.'), 
  // { prepend: false, once: false }, // with options
);

// Call handlers.
demoStarted(/* ...args */);

// Remove the handler.
remove();
```

## Node.js Import

```js
const EventHandle = require('event-handle');
```

## ES6 / Babel Functional Import

```js
import {
  createEventHandle,
  isEventHandle,
} from 'event-handle';
```
