
import { Observable, OperatorFunction, subscribeOn } from "rxjs"

export function myFilter<T>(filterFn: (v: T) => boolean ): OperatorFunction<T, T> {

  return (in$: Observable<T>) => {

    const out$ = new Observable<T>(subscriber => {
      // subscribe - CONSTRUCTOR
      const sub = in$.subscribe({
        // next
        next: (v) => {
          if(filterFn(v)) {
            subscriber.next(v);
          }
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
