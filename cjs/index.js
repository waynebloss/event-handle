"use strict";
// NOTE: The default export is known as EH internally, so as
// not to clash with the type named EventHandle.
Object.defineProperty(exports, "__esModule", { value: true });
/** Simple event system with closures.
 * @example
 * let demoStarted = EventHandle.create();
 * let remove = demoStarted.handle((...args) => console.log('Handled event.'),
 *   { prepend: false, once: false });
 * demoStarted(...args);  // Call event handlers.
 * remove();       // Remove the handler.
 */
var EH = {
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
    create: function (config) {
        var after;
        var before;
        var id;
        var handlers;
        if (config) {
            if (typeof config === 'string') {
                id = config;
            }
            else {
                id = config.id;
                after = config.after;
                before = config.before;
            }
        }
        function eventHandle() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (before)
                before.apply(void 0, args);
            if (handlers && handlers.length > 0) {
                // IMPORTANT: Copy array so handler-removal doesn't affect this loop.
                var safeHandlers = [].concat(handlers);
                var len = safeHandlers.length;
                var handler = void 0;
                for (var i = 0; i < len; i++) {
                    handler = safeHandlers[i];
                    handler.apply(void 0, args);
                }
            }
            if (after)
                after.apply(void 0, args);
        }
        var eh = eventHandle;
        /** Event identifier. */
        eh.id = id;
        /** Adds an event handler and returns its removal function.
         * @param {EventHandler} handler Event handler function.
         * @param {EventHandlerOptions} [options] Event handler options.
         */
        eh.handle = function handle(handler, options) {
            var once;
            var prepend;
            if (options) {
                once = options.once;
                prepend = options.prepend;
            }
            function handleOnce() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (tryRemoveHandler(handlers, entry)) {
                    if (handlers.length === 0)
                        handlers = undefined;
                    handler.apply(void 0, args);
                }
            }
            var entry = once ? handleOnce : handler;
            if (!handlers) {
                handlers = [entry];
            }
            else if (prepend) {
                handlers.unshift(entry);
            }
            else {
                handlers.push(entry);
            }
            /** Removes the event handler, returns `true` if found.
             * @returns {boolean} If the handler was found then `true` else `false`.
             */
            return function remove() {
                if (tryRemoveHandler(handlers, entry)) {
                    if (handlers.length === 0)
                        handlers = undefined;
                    return true;
                }
                else {
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
            if (handlers)
                handlers.length = 0;
        };
        return eh;
    },
    /** Returns true if `fn` is a function created by `create`. */
    isEventHandle: function (fn) {
        return fn && typeof fn === 'function' && typeof fn.handle === 'function';
    },
};
exports.default = EH;
function tryRemoveHandler(handlers, handler) {
    if (!handlers)
        return false;
    var removeIndex = handlers.indexOf(handler);
    var found = removeIndex > -1;
    if (found)
        handlers.splice(removeIndex, 1);
    return found;
}
