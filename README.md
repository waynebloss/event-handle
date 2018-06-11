# EventHandle

JavaScript event pattern with closures.

## Install

`npm install event-handle` or `yarn add event-handle`

## Import

```js
import EventHandle from 'event-handle'; // ES6
import {              // ES6 Functional Import
  createEventHandle,
  isEventHandle,
  onEvent,
} from 'event-handle';
const EventHandle = require('event-handle'); // CommonJS / Node.js
```

## Example

```js
// Create an event.
let demoStarted = EventHandle.create();

// Create a handler.
EventHandle.on(demoStarted, (...args) => {
  console.log('The demo started!', args)
}); // options: , { prepend: false, once: false }

// Create another handler.
let remove = demoStarted.handle((...args) => {
  console.log('Got it...', args);
});

// Trigger the event, calling all handlers.
demoStarted('a','r','g','s');

// Remove the handler.
console.log('removed: ', remove());

// Other functions:
console.log('handlerCount: ', demoStarted.handlerCount());
console.log('id: ', demoStarted.id); // defined if create was passed an id.
console.log('isEventHandle: ', EventHandle.isEventHandle(demoStarted));
console.log('removeAllHandlers: ', demoStarted.removeAllHandlers());
```

_See also:_ 

- Test code in `spec/index.spec.ts`
- Example code in `examples/`
