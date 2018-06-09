/** Simple event system with closures.
 * @example
 * let demoStarted = EventHandle.create();
 * let remove = demoStarted.handle((...args) => console.log('Handled event.'),
 *   { prepend: false, once: false });
 * demoStarted(...args);  // Call event handlers.
 * remove();       // Remove the handler.
 */
declare const EventHandleExports: {
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
    create(config?: string | EventHandleConfiguration | undefined): EventHandle;
    /** Returns true if `fn` is a function created by `create`. */
    isEventHandle(fn: any): fn is EventHandle;
};
export default EventHandleExports;
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
