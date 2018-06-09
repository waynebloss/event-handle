# EventHandle

Simple event system with closures.

```js
// Create an event.
let demoStarted = EventHandle.create();
// Create a handler.
let remove = demoStarted.handle(
  (...args) => console.log('Handled event.'), 
  { prepend: false, once: false },
);
// Call handlers.
demoStarted(...args);
// Remove the handler.
remove();
```
