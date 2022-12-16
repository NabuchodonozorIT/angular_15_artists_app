
import { Observable, OperatorFunction, subscribeOn } from "rxjs"

export function myTakeUntil<T>(trigger$: Observable<unknown> ): OperatorFunction<T, T> {

  return (in$: Observable<T>) => {

    const out$ = new Observable<T>(subscriber => {
      // subscribe - CONSTRUCTOR
      const sub = in$.subscribe({
        // next
        next: (v) => {
          subscriber.next(v);
        },
        // error
        error: (err) => {
          subscriber.error(err)
        },
        // complete
        complete: () => {
          subscriber.complete();
        }
      });

      const subTrigger = trigger$.subscribe(() => {
        subscriber.complete();
      });

      // unsubscribe - DESCRUTOR
      return () => {
        sub.unsubscribe();
        subTrigger.unsubscribe();
      }
    });

    return out$;
  }
}
