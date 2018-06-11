import 'jasmine';
import {
  default as defaultExport,
  createEventHandle,
  isEventHandle,
  EventHandle,
} from '../cjs';

describe('default export', () => {
  it('exports `createEventHandle` as `create`', () => {
    expect(defaultExport.create).toBe(createEventHandle);
  });
  it('exports `isEventHandle`', () => {
    expect(defaultExport.isEventHandle).toBe(isEventHandle);
  });
});

function isEventHandleType(target: any): target is EventHandle {
  return target && typeof target === 'function' && 
    typeof (<EventHandle>target).handle === 'function';
}

describe('createEventHandle', () => {
  let event1 = createEventHandle('event1');
  it('returns a function with the EventHandle interface', () => {
    expect(typeof event1).toBe('function');
    let result = isEventHandleType(event1);
    expect(result).toBe(true);
    expect(event1.id).toBe('event1');
  });
  it('can be called without any handlers', () => {
    expect(event1()).toBe(undefined);
  });
  it('can notify an event handler', () => {
    let handled = 0;
    let remove = event1.handle(() => { handled += 1; });
    expect(event1.handlerCount()).toBe(1);
    event1();
    remove();
    expect(event1.handlerCount()).toBe(0);
    event1();
    expect(handled).toBe(1);
  });
  it('can notify an event handler with arguments', () => {
    let handled = 0;
    let remove = event1.handle((i) => { handled += i; });
    expect(event1.handlerCount()).toBe(1);
    event1(100);
    remove();
    expect(event1.handlerCount()).toBe(0);
    event1(200);
    expect(handled).toBe(100);
  });
  it('can notify multiple event handlers', () => {
    let handled = 0;
    let remove = [
      event1.handle(() => { handled += 1; }),
      event1.handle(() => { handled += 1; }),
      event1.handle(() => { handled += 1; }),
    ];
    expect(event1.handlerCount()).toBe(3);
    event1();
    expect(handled).toBe(3);
    remove.forEach(removeFn => removeFn());
    expect(event1.handlerCount()).toBe(0);
  });
  it('can notify multiple event handlers with arguments', () => {
    let handled = 0;
    let remove = [
      event1.handle((i) => { handled += i; }),
      event1.handle((i) => { handled += i; }),
      event1.handle((i) => { handled += i; }),
    ];
    expect(event1.handlerCount()).toBe(3);
    event1(100);
    expect(handled).toBe(300);
    remove.forEach(removeFn => removeFn());
    expect(event1.handlerCount()).toBe(0);
  });
  it('can remove all event handlers at once', () => {
    let handled = 0;
    let remove = [
      event1.handle(() => { handled += 1; }),
      event1.handle(() => { handled += 1; }),
      event1.handle(() => { handled += 1; }),
    ];
    expect(event1.handlerCount()).toBe(3);
    event1();
    expect(handled).toBe(3);
    event1.removeAllHandlers();
    expect(event1.handlerCount()).toBe(0);
  });
});

describe('isEventHandle', () => {
  let event1 = createEventHandle('event1');
  it('returns true if a function has the EventHandle interface', () => {
    let result = isEventHandle(event1);
    expect(result).toBe(true);
  });
  it('returns false if a function doesn\'t have the EventHandle interface', () => {
    function f1() { return 'not an event!'; }
    let result = isEventHandle(f1);
    expect(result).toBe(false);
  });
});
