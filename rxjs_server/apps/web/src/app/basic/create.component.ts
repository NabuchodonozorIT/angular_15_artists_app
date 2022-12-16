import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import {
  Observable,
  fromEvent,
  interval,
  of,
  empty,
  EMPTY,
  range,
  timer,
  throwError,
  from,
  Observer
} from 'rxjs';
import { share } from 'rxjs/operators';
import { ListComponent } from '../components/list/list.component';
import { myInterval } from '../observables';

@Component({
  template: `
    <mat-toolbar>Create</mat-toolbar>
    <button #btn mat-raised-button color="primary">Button</button>
  `,
  styles: []
})
export class CreateComponent implements AfterViewInit {
  @ViewChild('btn', { read: ElementRef })
  btn: ElementRef;

  constructor(private list: ListComponent) {}

  ngAfterViewInit() {
    const log = (...args) => this.list.add(...args);
    const button = this.btn.nativeElement;

    // const stream$ = interval(500);
    // const stream$ = of({ id: 2, name: 'Piotr' });
    // const stream$ = from([{ id: 2, name: 'Piotr' }, { id: 2, name: 'Piotr' }]);
    // const promise = new Promise((resolve, reject) => resolve('data from promise'));
    // const stream$ = from(promise);
    // const stream$ = empty();
    // const stream$ = EMPTY;
    // const stream$ = range(2, 4);
    // const stream$ = timer(2000);
    const stream$ = throwError(() => 'custom error');

    const sub = stream$.subscribe(
      val => log('next', val),
      err => log('error', err),
      () => log('complete')
    );


    /**
     * myInterval
     */
    // const interval$ = myInterval(1000);

    // const sub2 = interval$.subscribe({
    //   next: data => log('SUCCESS', data),
    //   error: err => log('ERROR', err),
    //   complete: () => log('COMPLETE')
    // });

    // setTimeout(() => {
    //   sub2.unsubscribe();
    // }, 4000);
  }
}
