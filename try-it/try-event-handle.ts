import {
  default as EventHandle,
} from '../src';

export const Things = {
  e1: EventHandle.create('e1'),
  e2: EventHandle.create('e2'),
};

console.log('EventHandle.isEventHandle(Things.e1): ', EventHandle.isEventHandle(Things.e1));
console.log('EventHandle.isEventHandle(Things.e2): ', EventHandle.isEventHandle(Things.e2));

Things.e1.handle(() => console.log('HELLO!'));
Things.e2.handle(() => console.log('GOODBYE.'), { once: true });

Things.e1();
Things.e1();
Things.e2();
Things.e2();
