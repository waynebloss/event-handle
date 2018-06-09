/// <reference path="polyfill.d.ts" />
import {
  EventHandle,
  EventHandleConfiguration,
  EventHandleFunction,
  EventHandler,
  EventHandlerOptions,
  EventHandlerRemover,
} from './types';

// NOTE: The default export is known as EventHandleExports internally, so as
// not to clash with the type, also named EventHandle.

/** Simple event system with closures.
 * @example
 * let demoStarted = EventHandle.create();
 * let remove = demoStarted.handle((...args) => console.log('Handled event.'), 
 *   { prepend: false, once: false });
 * demoStarted(...args);  // Call event handlers.
 * remove();       // Remove the handler.
 */
const EventHandleExports = {
  /** Returns a function that triggers an event. The function has members such 
   * as `.handle()` to add a handler, `.id` (a string), `.handlerCount()` and 
   * `.removeAllHandlers()`.
   * @example
   * let demoStarted = EventHandle.create();
   * let remove = demoStarted.handle((...args) => console.log('Handled event.'), 
   *   { prepend: false, once: false });
   * demoStarted(...args);  // Call event handlers.
   * remove();       // Remove the handler.
   * @param {EventHandleConfiguration|string} [config] Event id or configuration.
   */
  create(config?: EventHandleConfiguration | string): EventHandle {
    let after: EventHandler | undefined;
    let before: EventHandler | undefined;
    let id: string | undefined;
    let handlers: EventHandler[] | undefined;

    if (config) {
      if (typeof config === 'string') {
        id = config;
      } else {
        id = config.id;
        after = config.after;
        before = config.before;
      }
    }

    function eventHandle(...args: any[]) {
      if (before) before(...args);
      if (handlers && handlers.length > 0) {
        // IMPORTANT: Copy array so handler-removal doesn't affect this loop.
        let safeHandlers = [].concat(handlers as any);
        const len = safeHandlers.length;
        let handler: EventHandler;
        for (let i = 0; i < len; i++) {
          handler = safeHandlers[i];
          handler(...args);
        }
      }
      if (after) after(...args);
    }

    return Object.assign(eventHandle, {
      /** Event identifier. */
      id,
      /** Adds an event handler and returns its removal function.
       * @param {EventHandler} handler Event handler function.
       * @param {EventHandlerOptions} [options] Event handler options.
       */
      handle(handler: EventHandler, options?:EventHandlerOptions): EventHandlerRemover {
        let once: boolean | undefined;
        let prepend: boolean | undefined;
        if (options) {
          once = options.once;
          prepend = options.prepend;
        }
        
        function handleOnce(...args: any[]) {
          if (tryRemoveHandler(handlers, entry)) {
            if (handlers!.length === 0) handlers = undefined;
            handler(...args);
          }
        }

        const entry = once ? handleOnce : handler;

        if (!handlers) {
          handlers = [entry];
        } else if (prepend) {
          handlers.unshift(entry);
        } else {
          handlers.push(entry);
        }
        /** Removes the event handler, returns `true` if found.
         * @returns {boolean} If the handler was found then `true` else `false`.
         */
        return function remove() {
          if (tryRemoveHandler(handlers, entry)) {
            if (handlers!.length === 0) handlers = undefined;
            return true;
          } else {
            return false;
          }
        };
      },
      /** Returns the number of event handlers. */
      handlerCount() {
        return handlers ? handlers.length : 0;
      },
      /** Removes all event handlers. */
      removeAllHandlers() {
        if (handlers) handlers.length = 0;
      },
    });
  },
  /** Returns true if `fn` is a function created by `create`. */
  isEventHandle(fn: any): fn is EventHandle {
    return fn && typeof fn === 'function' && typeof fn.handle === 'function';
  },
}
export = EventHandleExports;

function tryRemoveHandler(handlers: EventHandler[] | undefined, handler: EventHandler) {
  if (!handlers) return false;
  const removeIndex = handlers.indexOf(handler);
  const found = removeIndex > -1;
  if (found) handlers.splice(removeIndex, 1);
  return found;
}
