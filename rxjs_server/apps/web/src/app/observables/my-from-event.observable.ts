import { Observable } from "rxjs";
import { HasEventTargetAddRemove } from "rxjs/internal/observable/fromEvent";

export function myFromEvent<T>(el: HasEventTargetAddRemove<T>, eventName: string, maxCount?:number) {

  return new Observable(subscriber => {
    // CONSTRUCTOR
    console.log('CONSTRUCT start working')
    let count = 0;
    function onEvent(e) {
      console.log('ON EVENT');
      ++count;
      subscriber.next(e);
      if(maxCount && maxCount <= count) {
        console.log('SEND COMPLETE');
        subscriber.complete();
      }
    }
    el.addEventListener(eventName, onEvent);

    // DESTRUCTOR
    return () => {
      console.log('DESTRUCTOR time to cleanup');
      el.removeEventListener(eventName, onEvent);
    }
  });
}
