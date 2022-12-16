import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent, Observable, Observer, Subscription, EMPTY } from 'rxjs';
import { share, map, filter, tap } from 'rxjs/operators';
import { ListComponent } from '../components/list/list.component';
import { LoginDto, SessionDto, ProfileModel } from "@core";
import { myAjax, myFromEvent } from '../observables';

@Component({
  selector: 'rxjs-observable',
  template: `
    <mat-toolbar>Observable</mat-toolbar>
    <form>
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input #email matInput value="piotr@myflow.pl" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Password</mat-label>
        <input #password matInput type="password" value="123" />
      </mat-form-field>

      <button #btn mat-raised-button color="primary">Button</button>
    </form>
    <pre>{{profile | json}}</pre>
  `
})
export class ObservableComponent implements AfterViewInit {
  @ViewChild('btn', { read: ElementRef })
  btn: ElementRef;
  @ViewChild('email', { read: ElementRef })
  email: ElementRef;
  @ViewChild('password', { read: ElementRef })
  password: ElementRef;
  profile: ProfileModel = null;

  constructor(private list: ListComponent) {}

  ngAfterViewInit() {
    const log = (...args) => this.list.add(...args);
    const button = this.btn.nativeElement;
    const email = this.email.nativeElement;
    const password = this.password.nativeElement;

    // ---------------------------------------------------------------------

    // 1 - Źródło
    const btn$: Observable<MouseEvent> = fromEvent(button, 'click');

    // 2 - Operatory (modyfikacja wartości)
    const request$ = btn$.pipe(
      // operatory modyfikujace wartości
      tap(e => console.log('E')),
      filter(e => !e.ctrlKey),
      map(e => e.altKey),
    )

    // 3 - Subskrypcja
    // log('SUB')
    // const sub: Subscription = request$.subscribe(
    //   val => log('next', val),
    //   err => log('error', err),
    //   () => log('complete')
    // );

    // // 4 - unsubscribe
    // setTimeout(() => {
    //   log('UNSUB')
    //   sub.unsubscribe();
    // }, 2000);

    // ---------------------------------------------------------------------

    /**
     * Tworzenie własnego źródła
     */
    const btn2$ = myFromEvent(button, 'click', 3).pipe(
      share(),
    );

    // // Subskrybent A
    // console.log('SUB A');
    // const subA = btn2$.subscribe(
    //   val => console.log('A next', val),
    //   err => console.log('A error', err),
    //   () => console.log('A complete')
    // );
    // setTimeout(() => {
    //   console.log('UN SUB A');
    //   subA.unsubscribe();
    // }, 5000);

    // // Subskrybent B
    // console.log('SUB B');
    // const subB = btn2$.subscribe(
    //   val => console.log('B next', val),
    //   err => console.log('B error', err),
    //   () => console.log('B complete')
    // );
    // setTimeout(() => {
    //   console.log('UN SUB B');
    //   subB.unsubscribe();
    // }, 4000);

    // ---------------------------------------------------------------------

    /**
     * Opakowanie Promise w Observable
     */
    const apiUrl = '/api/quotes?q=the';

    const ajax$ = myAjax(apiUrl);

    const sub = ajax$.subscribe(
      data => log('SUCCESS', data),
      err => log('ERROR', err),
      () => log('COMPLETE')
    );

  }
}
