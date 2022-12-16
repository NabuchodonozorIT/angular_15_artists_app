import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import {
  Observable,
  fromEvent,
  combineLatest,
  BehaviorSubject,
  interval,
  of,
  EMPTY,
  Subscription
} from 'rxjs';
import {
  startWith,
  map,
  share,
  switchMap,
  catchError,
  takeUntil,
  filter
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ListComponent } from '../components/list/list.component';
import { myMap } from '../operators';
import { myTakeUntil } from '../operators/my-take-until.operator';

@Component({
  selector: 'rxjs-operators',
  template: `
    <mat-toolbar>Operators</mat-toolbar>
    <p>
      zaawansowane: switchMap, debounceTime throttleTime combineLatest retry
      merge delay bufferTime switchMap takeUntil
    </p>
    <input
      #input
      type="text"
      id="textInput"
      class="form-control"
      placeholder="Enter Query..."
      autocomplete="false"
    />
    <pre>{{ text }}</pre>
    <button #btn mat-raised-button color="primary">Button</button>

    <pre>{{ data$ | async | json }}</pre>
  `,
  styles: []
})
export class OperatorsComponent implements AfterViewInit {
  @ViewChild('input', { read: ElementRef })
  input: ElementRef;
  @ViewChild('btn', { read: ElementRef })
  btn: ElementRef;
  text: string;

  data$: Observable<any>;
  constructor(private list: ListComponent) {}
  ngAfterViewInit() {
    const log = (...args) => this.list.add(...args);
    const button = this.btn.nativeElement;
    const input = this.input.nativeElement;

    const btn$: Observable<MouseEvent> = fromEvent(button, 'click');
    const input$: Observable<MouseEvent> = fromEvent(input, 'keyup');

    const interval$ = interval(1000);


    function mapFilter<T>() {
      return function (in$: Observable<T>) {
        const out$ = in$.pipe(
          map(res => res),
          filter(res => !res),
        );

        return out$;
      }
    }

    // this.data$ = ajax('/api/quotes?q=sh').pipe(
    //   // mapFilter(),
    //   filter(res => !res),
    //   myMap(items => items[0]),
    //   // myFilter(item => item.title.length > 150),
    //   // myStartWith({ id: 2, name: 'guest' }),
    //   // takeUntil(btn$)
    // );

    this.data$ = interval$.pipe(
      // takeUntil(btn$)
      myTakeUntil(btn$)
    );

    const sub = this.data$.subscribe(
      data => log('DATA', data),
      err => log('ERR', err),
      () => log('COMPLETE')
    );
    // setTimeout(() => {
    //   sub.unsubscribe();
    // }, 500);

  }
}
