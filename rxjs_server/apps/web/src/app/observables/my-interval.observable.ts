import { Observable } from "rxjs";

export function myInterval(time: number): Observable<number> {

  return new Observable(subscriber => {

    let count = 0;

    const id = setInterval(() => subscriber.next(++count), time);

    return () => clearInterval(id);
  });
}
