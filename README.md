# EventHandle

Simple event system with closures.

```js
import EventHandle from 'event-handle'; // or require('event-handle').default;

// Create an event.
let demoStarted = EventHandle.create();

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
