# EventHandle

JavaScript event pattern with closures.

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

## Example

```js
import EventHandle from 'event-handle';

// Create an event.
let demoStarted = EventHandle.create();

// Create a handler.
let remove = demoStarted.handle(
  (...args) => {
    console.log('Handled event.', args)
  },
  // options: { prepend: false, once: false },
);

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

_See also:_ Test code in `spec/index.spec.ts`
