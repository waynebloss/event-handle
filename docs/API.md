## Default Export

<dl>
<dt><a href="#EventHandle">EventHandle</a></dt>
<dd><p>Events with closures.</p>
</dd>
</dl>

## Function Exports

<dl>
<dt><a href="#createEventHandle">createEventHandle([config])</a> ⇒ <code>function</code></dt>
<dd><p>Returns a function that triggers an event. The function has members such
as <code>.handle()</code> to add a handler, <code>.id</code> (a string), <code>.handlerCount()</code> and
<code>.removeAllHandlers()</code>.</p>
</dd>
<dt><a href="#isEventHandle">isEventHandle(fn)</a> ⇒ <code>boolean</code></dt>
<dd><p>Returns true if <code>fn</code> is a function created by <code>createEventHandle</code>.</p>
</dd>
<dt><a href="#onEvent">onEvent(evt, handler, [options])</a> ⇒ <code>function</code></dt>
<dd><p>Adds a handler to the given event.</p>
</dd>
</dl>

<a name="EventHandle"></a>

## EventHandle
Events with closures.

**Kind**: global variable  

* [EventHandle](#EventHandle)
    * [.create](#EventHandle.create) ⇒ <code>function</code>
    * [.isEventHandle](#EventHandle.isEventHandle) ⇒ <code>boolean</code>
    * [.on](#EventHandle.on) ⇒ <code>function</code>

<a name="EventHandle.create"></a>

### EventHandle.create ⇒ <code>function</code>
Returns a function that triggers an event. The function has members such
as `.handle()` to add a handler, `.id` (a string), `.handlerCount()` and
`.removeAllHandlers()`.

**Kind**: static property of [<code>EventHandle</code>](#EventHandle)  
**Returns**: <code>function</code> - The event.  

| Param | Type | Description |
| --- | --- | --- |
| [config] | <code>EventHandleConfiguration</code> \| <code>string</code> | Event id or configuration. |

<a name="EventHandle.isEventHandle"></a>

### EventHandle.isEventHandle ⇒ <code>boolean</code>
Returns true if `fn` is a function created by `createEventHandle`.

**Kind**: static property of [<code>EventHandle</code>](#EventHandle)  
**Returns**: <code>boolean</code> - True if the given fn is an EventHandle.  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The function to check. |

<a name="EventHandle.on"></a>

### EventHandle.on ⇒ <code>function</code>
Adds a handler to the given event.

**Kind**: static property of [<code>EventHandle</code>](#EventHandle)  
**Returns**: <code>function</code> - A function to remove the handler.  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>function</code> | The event to add a handler to. |
| handler | <code>function</code> | The handler function for the event. |
| [options] | <code>EventHandlerOptions</code> | Options for the handler. |

<a name="createEventHandle"></a>

## createEventHandle([config]) ⇒ <code>function</code>
Returns a function that triggers an event. The function has members such
as `.handle()` to add a handler, `.id` (a string), `.handlerCount()` and
`.removeAllHandlers()`.

**Kind**: global function  
**Returns**: <code>function</code> - The event.  

| Param | Type | Description |
| --- | --- | --- |
| [config] | <code>EventHandleConfiguration</code> \| <code>string</code> | Event id or configuration. |

<a name="isEventHandle"></a>

## isEventHandle(fn) ⇒ <code>boolean</code>
Returns true if `fn` is a function created by `createEventHandle`.

**Kind**: global function  
**Returns**: <code>boolean</code> - True if the given fn is an EventHandle.  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The function to check. |

<a name="onEvent"></a>

## onEvent(evt, handler, [options]) ⇒ <code>function</code>
Adds a handler to the given event.

**Kind**: global function  
**Returns**: <code>function</code> - A function to remove the handler.  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>function</code> | The event to add a handler to. |
| handler | <code>function</code> | The handler function for the event. |
| [options] | <code>EventHandlerOptions</code> | Options for the handler. |

