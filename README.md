# EventHandle

JavaScript event pattern with closures.

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

// Trigger the event, calling all handlers.
demoStarted(/* ...args */);

// Remove the handler.
remove();

// Other functions:
console.log('id: ', demoStarted.id); // defined if create was passed an id.
console.log('handlerCount: ', demoStarted.handlerCount());
console.log('removeAllHandlers: ', demoStarted.removeAllHandlers());
```

## ES6 Import

```js
import EventHandle from 'event-handle';
```

## ES6 / Babel Functional Import

```js
import {
  createEventHandle,
  isEventHandle,
} from 'event-handle';
```

## Node.js Import

```js
const EventHandle = require('event-handle');
```
