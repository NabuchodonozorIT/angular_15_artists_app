import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { fromEvent, of, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  delay,
  share,
  mergeMap,
  exhaustMap
} from 'rxjs/operators';

@Component({
  selector: 'rxjs-autocomplete',
  template: `
    <h1>Autocomplete</h1>
    <form role="form">
      <div class="form-group">
        <label for="textInput">Enter Query for Wikipedia</label>
        <input
          #input
          type="text"
          id="textInput"
          class="form-control"
          placeholder="Enter Query..."
        />
      </div>
    </form>

    <h2>
      Wyniki <small>({{ items.length }})</small>
    </h2>
    <ul class="list-group">
      <li class="list-group-item" *ngFor="let item of items; let i = index">
        {{ item.title }}
      </li>
    </ul>
  `,
  styles: []
})
export class AutocompleteComponent implements AfterViewInit {
  @ViewChild('input')
  input: ElementRef;

  items = [];
  constructor() {}

  ngAfterViewInit() {
    const input = this.input.nativeElement;

    const keyup$ = fromEvent(input, 'keyup').pipe(
      // ???
    );

    keyup$.subscribe((data: any) => {
      console.log('data', data);
      this.items = data;
    });
  }
}

function searchWikipedia(term) {
  return ajax.getJSON('/api/wikipedia?search=' + term).pipe(
    map(response => response),
    catchError(err => {
      return of([{ title: 'error: ' + err.message }]);
    })
  );
}
