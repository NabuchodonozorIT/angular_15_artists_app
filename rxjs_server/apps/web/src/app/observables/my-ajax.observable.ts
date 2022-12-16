import { Observable } from 'rxjs';

/**
 * Promise based request
 */
// function ajax<T>(url, signal): Promise<T> {
//   return <any> fetch(url, { signal: signal })
//     .then(res => res.json());
// }
/**

 const ctrl = new AbortController();
 ajax('/api/quotes?q=the', ctrl.signal)
   .then(data => console.log('SUCCESS', data))
   .catch(err => console.log('ERROR', err));

 setTimeout(() => ctrl.abort(), 1000);

 */

/**
 * Observable based Request
 */
export function myAjax(url) {
  return new Observable(subscriber => {
    // construct
    const ctrl = new AbortController();

    fetch(url, {signal: ctrl.signal})
      .then(res => res.status >= 400 ? Promise.reject(res) : res)
      .then(res => res.json())
      .then(data => {
        subscriber.next(data);
        subscriber.complete();
      })
      .catch(err => {
        subscriber.error(err)
      })

    // destructor
    return () => {
      ctrl.abort();
    }
  });
}
