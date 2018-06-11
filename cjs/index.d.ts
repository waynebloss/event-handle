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
export declare function createEventHandle(config?: EventHandleConfiguration | string): EventHandle;
/** Returns true if `fn` is a function created by `createEventHandle`. */
export declare function isEventHandle(fn: any): fn is EventHandle;
/**
 * Adds a handler to the given event.
 * @param evt The event to add a handler to.
 * @param handler The handler function for the event.
 * @param [options] Options for the handler.
 */
export declare function onEvent(evt: EventHandle, handler: EventHandler, options?: EventHandlerOptions): EventHandlerRemover;
/** Simple event system with closures.
 * @example
 * let demoStarted = EventHandle.create();
 * let remove = demoStarted.handle((...args) => console.log('Handled event.'),
 *   { prepend: false, once: false });
 * demoStarted(...args);  // Call event handlers.
 * remove();       // Remove the handler.
 */
declare const EH: {
    create: typeof createEventHandle;
    isEventHandle: typeof isEventHandle;
    on: typeof onEvent;
};
export default EH;
/** Core function that triggers the event. */
export declare type EventHandleFunction = (...args: any[]) => void;
/** Function with extended properties that triggers the event. */
export interface EventHandle extends EventHandleFunction {
    handle: (handler: EventHandler, options?: EventHandlerOptions) => EventHandlerRemover;
    handlerCount: () => number;
    id?: string;
    removeAllHandlers: () => void;
}
export interface EventHandleConfiguration {
    /** Event identifier (typically a name). */
    id?: string;
    /** Function to be called before event handlers. */
    before?(...args: any[]): void;
    /** Function to be called after event handlers. */
    after?(...args: any[]): void;
}
/** Function that will handle an event. */
export declare type EventHandler = (...args: any[]) => void;
export interface EventHandlerOptions {
    /** True if the handler should be called only once.  */
    once?: boolean;
    /** True if the handler should be inserted first. */
    prepend?: boolean;
}
/** Removes an `EventHandler` from its `EventHandle` so it won't be called. */
export declare type EventHandlerRemover = () => boolean;
