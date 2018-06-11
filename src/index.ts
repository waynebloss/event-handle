/** Returns a function that triggers an event. The function has members such 
 * as `.handle()` to add a handler, `.id` (a string), `.handlerCount()` and 
 * `.removeAllHandlers()`.
 * @param {EventHandleConfiguration|string} [config] Event id or configuration.
 * @returns {function} The event.
 */
export function createEventHandle(config?: EventHandleConfiguration | string): EventHandle {
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

  let eh: any = eventHandle;
  /** Event identifier. */
  eh.id = id;
  /** Adds an event handler and returns its removal function.
   * @param {EventHandler} handler Event handler function.
   * @param {EventHandlerOptions} [options] Event handler options.
   */
  eh.handle = function handle(handler: EventHandler, options?:EventHandlerOptions): EventHandlerRemover {
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
  eh.handlerCount = function handlerCount() {
    return handlers ? handlers.length : 0;
  };
  /** Removes all event handlers. */
  eh.removeAllHandlers = function removeAllHandlers() {
    if (handlers) handlers.length = 0;
  };
  return eh;
}
/** Returns true if `fn` is a function created by `createEventHandle`.
 * @param {function} fn The function to check.
 * @returns {boolean} True if the given fn is an EventHandle.
 */
export function isEventHandle(fn: any): fn is EventHandle {
  return fn && typeof fn === 'function' && typeof fn.handle === 'function';
}
/**
 * Adds a handler to the given event.
 * @param {function} evt The event to add a handler to.
 * @param {function} handler The handler function for the event.
 * @param {EventHandlerOptions} [options] Options for the handler.
 * @returns {function} A function to remove the handler.
 */
export function onEvent(evt: EventHandle, handler: EventHandler, options?: EventHandlerOptions): EventHandlerRemover {
  if (!isEventHandle(evt)) {
    throw new Error('Expected event handler, got: ' + typeof evt);
  }
  return evt.handle(handler, options);
}
/** Events with closures. */
const EventHandle = {
  /** Returns a function that triggers an event. The function has members such 
   * as `.handle()` to add a handler, `.id` (a string), `.handlerCount()` and 
   * `.removeAllHandlers()`.
   * @param {EventHandleConfiguration|string} [config] Event id or configuration.
   * @returns {function} The event.
   */
  create: createEventHandle,
  /** Returns true if `fn` is a function created by `createEventHandle`.
   * @param {function} fn The function to check.
   * @returns {boolean} True if the given fn is an EventHandle.
   */
  isEventHandle,
  /**
   * Adds a handler to the given event.
   * @param {function} evt The event to add a handler to.
   * @param {function} handler The handler function for the event.
   * @param {EventHandlerOptions} [options] Options for the handler.
   * @returns {function} A function to remove the handler.
   */
  on: onEvent,
}
export default EventHandle;

/** Core function that triggers the event. */
export type EventHandleFunction = (...args: any[]) => void;

/** Function with extended properties that triggers the event. */
export interface EventHandle extends EventHandleFunction {
  /** Adds a handler to the event.
   * @param {function} handler The handler function.
   * @param {EventHandlerOptions} [options] Options for the handler.
   * @returns {function} A function to remove the handler.
   */
  handle: (handler: EventHandler, options?:EventHandlerOptions) => EventHandlerRemover;
  /** Returns the number of current handlers.
   * @returns {number} The number of current handlers.
   */
  handlerCount: () => number;
  /** The id of the event as given to the `createEventHandle` method.
   * @type {string}
   */
  id?:string;
  /** Removes all event handlers. */
  removeAllHandlers: () => void;
}

/** Configuration options for an event. */
export interface EventHandleConfiguration {
  /** Event identifier (typically a name). */
  id?: string;
  /** Function to be called before event handlers. */
  before?(...args: any[]): void;
  /** Function to be called after event handlers. */
  after?(...args: any[]): void;
}

/** Function that will handle an event. */
export type EventHandler = (...args: any[]) => void;

/** Options for an event handler. */
export interface EventHandlerOptions {
  /** True if the handler should be called only once.  */
  once?: boolean;
  /** True if the handler should be inserted first. */
  prepend?: boolean;
}

/** Removes an `EventHandler` so it won't be called. */
export type EventHandlerRemover = () => boolean;

function tryRemoveHandler(handlers: EventHandler[] | undefined, handler: EventHandler) {
  if (!handlers) return false;
  const removeIndex = handlers.indexOf(handler);
  const found = removeIndex > -1;
  if (found) handlers.splice(removeIndex, 1);
  return found;
}
