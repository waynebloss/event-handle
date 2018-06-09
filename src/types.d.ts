/** Core function that triggers the event. */
export type EventHandleFunction = (...args: any[]) => void;

/** Function with extended properties that triggers the event. */
export interface EventHandle extends EventHandleFunction {
  handle: (handler: EventHandler, options?:EventHandlerOptions) => EventHandlerRemover;
  handlerCount: () => number;
  id?:string;
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
export type EventHandler = (...args: any[]) => void;

export interface EventHandlerOptions {
  /** True if the handler should be called only once.  */
  once?: boolean;
  /** True if the handler should be inserted first. */
  prepend?: boolean;
}

/** Removes an `EventHandler` from its `EventHandle` so it won't be called. */
export type EventHandlerRemover = () => boolean;
