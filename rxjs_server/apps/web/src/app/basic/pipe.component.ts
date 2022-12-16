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
  interval,
  Subject,
  Subscription,
  of
} from 'rxjs';
import {
  map,
  distinctUntilChanged,
  debounceTime,
  debounce,
  groupBy,
  filter,
  bufferTime,
  buffer,
  retry,
  switchMap,
  tap,
  catchError
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ListComponent } from '../components/list/list.component';

@Component({
  template: `
    <mat-toolbar>Pipe</mat-toolbar>
    <input
      #inputRef
      type="text"
      id="textInput"
      class="form-control"
      placeholder="Enter Query..."
      autocomplete="false"
    />
    <pre>{{ text }}</pre>
    <button #btn mat-raised-button color="primary">Button</button>
  `
})
export class PipeComponent implements AfterViewInit {
  @ViewChild('inputRef', { read: ElementRef })
  input: ElementRef;
  @ViewChild('btn', { read: ElementRef })
  btn: ElementRef;
  text: string;
  constructor(private list: ListComponent) {}

  ngAfterViewInit() {
    const log = (...args) => this.list.add(...args);
    const button = this.btn.nativeElement;
    const input = this.input.nativeElement;

    const interval$ = interval(1000);
    const btn$: Observable<MouseEvent> = fromEvent(button, 'click');
    const input$ = fromEvent<any>(input, 'keyup');

    const keyboard$ = input$.pipe(
      map(e => e.target.value),
      filter(v => v.length > 2),
      distinctUntilChanged(),
      debounceTime(250),
      switchMap(str =>
        ajax('/api/quotes?q=' + str).pipe(
          map(response => response.response),
          catchError(err => of([{ title: 'UPS, error z serwera...' }]))
        )
      ),
      map(data => data)
    );

    const s = keyboard$.subscribe(v => log('V', v));
  }
}

// express cancel request
// https://stackoverflow.com/questions/55886372/creating-a-cancel-button-how-to-completely-abort-a-request-in-node-express-js
