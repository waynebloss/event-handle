/** Returns a function that triggers an event. The function has members such
 * as `.handle()` to add a handler, `.id` (a string), `.handlerCount()` and
 * `.removeAllHandlers()`.
 * @param {EventHandleConfiguration|string} [config] Event id or configuration.
 * @returns {function} The event.
 */
export declare function createEventHandle(config?: EventHandleConfiguration | string): EventHandle;
/** Returns true if `fn` is a function created by `createEventHandle`.
 * @param {function} fn The function to check.
 * @returns {boolean} True if the given fn is an EventHandle.
 */
export declare function isEventHandle(fn: any): fn is EventHandle;
/**
 * Adds a handler to the given event.
 * @param {function} evt The event to add a handler to.
 * @param {function} handler The handler function for the event.
 * @param {EventHandlerOptions} [options] Options for the handler.
 * @returns {function} A function to remove the handler.
 */
export declare function onEvent(evt: EventHandle, handler: EventHandler, options?: EventHandlerOptions): EventHandlerRemover;
/** Events with closures. */
declare const EventHandle: {
    /** Returns a function that triggers an event. The function has members such
     * as `.handle()` to add a handler, `.id` (a string), `.handlerCount()` and
     * `.removeAllHandlers()`.
     * @param {EventHandleConfiguration|string} [config] Event id or configuration.
     * @returns {function} The event.
     */
    create: typeof createEventHandle;
    /** Returns true if `fn` is a function created by `createEventHandle`.
     * @param {function} fn The function to check.
     * @returns {boolean} True if the given fn is an EventHandle.
     */
    isEventHandle: typeof isEventHandle;
    /**
     * Adds a handler to the given event.
     * @param {function} evt The event to add a handler to.
     * @param {function} handler The handler function for the event.
     * @param {EventHandlerOptions} [options] Options for the handler.
     * @returns {function} A function to remove the handler.
     */
    on: typeof onEvent;
};
export default EventHandle;
/** Core function that triggers the event. */
export declare type EventHandleFunction = (...args: any[]) => void;
/** Function with extended properties that triggers the event. */
export interface EventHandle extends EventHandleFunction {
    /** Adds a handler to the event.
     * @param {function} handler The handler function.
     * @param {EventHandlerOptions} [options] Options for the handler.
     * @returns {function} A function to remove the handler.
     */
    handle: (handler: EventHandler, options?: EventHandlerOptions) => EventHandlerRemover;
    /** Returns the number of current handlers.
     * @returns {number} The number of current handlers.
     */
    handlerCount: () => number;
    /** The id of the event as given to the `createEventHandle` method.
     * @type {string}
     */
    id?: string;
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
export declare type EventHandler = (...args: any[]) => void;
/** Options for an event handler. */
export interface EventHandlerOptions {
    /** True if the handler should be called only once.  */
    once?: boolean;
    /** True if the handler should be inserted first. */
    prepend?: boolean;
}
/** Removes an `EventHandler` so it won't be called. */
export declare type EventHandlerRemover = () => boolean;
