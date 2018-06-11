import EventHandle from '../cjs';

export const Foo = {
  event1: EventHandle.create('event1'),
  event2: EventHandle.create('event2'),
};

EventHandle.on(Foo.event1, () => console.log('Event 1.'));
EventHandle.on(Foo.event2, () => console.log('Event 2.'));

Foo.event1.handle(() => console.log('HELLO!'));
Foo.event2.handle(() => console.log('GOODBYE.'), { once: true });

EventHandle.on(Foo.event2, ()=> {
  console.log('** PRIORITY Event 2! **')
}, { prepend: true });

Foo.event1();
Foo.event1();
Foo.event2();
Foo.event2();
