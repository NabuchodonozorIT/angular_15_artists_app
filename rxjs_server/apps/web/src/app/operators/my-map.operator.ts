import { Observable, OperatorFunction, subscribeOn } from "rxjs"

export function myMap<T, R>(mapFn: (v: T) => R ): OperatorFunction<T, R> {

  return (in$: Observable<T>) => {

    const out$ = new Observable<R>(subscriber => {
      // subscribe - CONSTRUCTOR
      const sub = in$.subscribe({
        // next
        next: (v) => {
          subscriber.next(mapFn(v));
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

      // unsubscribe - DESCRUTOR
      return () => {
        sub.unsubscribe();
      }
    });

    return out$;
  }
}
