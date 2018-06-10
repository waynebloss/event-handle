// import EventHandle from '../cjs'; // This works...
import {
  createEventHandle,
  isEventHandle,
} from '../cjs';

export const Things = {
  e1: createEventHandle('e1'), // or EventHandle.create()
  e2: createEventHandle('e2'),
};

console.log('EventHandle.isEventHandle(Things.e1): ', isEventHandle(Things.e1)); // or EventHandle.isEventHandle()
console.log('EventHandle.isEventHandle(Things.e2): ', isEventHandle(Things.e2));

Things.e1.handle(() => console.log('HELLO!'));
Things.e2.handle(() => console.log('GOODBYE.'), { once: true });

const opt = { prepend: true };
Things.e2.handle(()=> console.log('ayyyy!'), opt);

Things.e1();
Things.e1();
Things.e2();
Things.e2();
