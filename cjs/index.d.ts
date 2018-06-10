/// <reference path="../src/polyfill.d.ts" />
/** Simple event system with closures.
 * @example
 * let demoStarted = EventHandle.create();
 * let remove = demoStarted.handle((...args) => console.log('Handled event.'),
 *   { prepend: false, once: false });
 * demoStarted(...args);  // Call event handlers.
 * remove();       // Remove the handler.
 */
declare const EH: {
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
    create(config?: string | EH.EventHandleConfiguration | undefined): EH.EventHandle;
    /** Returns true if `fn` is a function created by `create`. */
    isEventHandle(fn: any): fn is EH.EventHandle;
};
export = EH;
declare namespace EH {
    /** Core function that triggers the event. */
    type EventHandleFunction = (...args: any[]) => void;
    /** Function with extended properties that triggers the event. */
    interface EventHandle extends EventHandleFunction {
        handle: (handler: EventHandler, options?: EventHandlerOptions) => EventHandlerRemover;
        handlerCount: () => number;
        id?: string;
        removeAllHandlers: () => void;
    }
    interface EventHandleConfiguration {
        /** Event identifier (typically a name). */
        id?: string;
        /** Function to be called before event handlers. */
        before?(...args: any[]): void;
        /** Function to be called after event handlers. */
        after?(...args: any[]): void;
    }
    /** Function that will handle an event. */
    type EventHandler = (...args: any[]) => void;
    interface EventHandlerOptions {
        /** True if the handler should be called only once.  */
        once?: boolean;
        /** True if the handler should be inserted first. */
        prepend?: boolean;
    }
    /** Removes an `EventHandler` from its `EventHandle` so it won't be called. */
    type EventHandlerRemover = () => boolean;
}
