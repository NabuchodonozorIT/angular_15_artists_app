import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import {
  Observable,
  Subject,
  Subscription,
  BehaviorSubject,
  ReplaySubject
} from 'rxjs';
import { tap, takeUntil, share } from 'rxjs/operators';
import { ListComponent } from '../components/list/list.component';

@Component({
  selector: 'rxjs-subject',
  template: `
    <mat-toolbar>Subject, BehaviorSubject, ReplaySubject</mat-toolbar>
    <button #btn mat-raised-button color="primary">Button</button>

    <hr />
    <button (click)="showList = !showList" mat-raised-button color="primary">
      toggle debug
    </button>
    <p>
      <b *ngIf="showList"> {{ list$ | async | json }} </b>
    </p>

    <hr />
  `,
  styles: []
})
export class SubjectComponent implements AfterViewInit, OnDestroy {
  destroy$ = new Subject();

  subscription: Subscription;

  showList = true;

  @ViewChild('btn', { read: ElementRef })
  btn: ElementRef;

  list$: Observable<any>;
  list: any;
  constructor(private listComp: ListComponent) {}

  ngAfterViewInit() {
    const log = (...args) => this.listComp.add(...args);
    const button = this.btn.nativeElement;

    // const subject$ = new Subject();
    // const subject$ = new BehaviorSubject(0);
    const subject$ = new ReplaySubject(3);

    let counter = 0;

    button.addEventListener('click', () => {
      counter++;
      log('counter', counter);
      subject$.next(counter);
    });

    this.list$ = subject$.asObservable().pipe(
      tap(value => log('tap', value)),
      takeUntil(this.destroy$)
    );

    // log(subject$.getValue());
    // this.list$.subscribe(val => this.list = val);
  }

  ngOnDestroy(): void {
    // TAK
    this.destroy$.next(null);
    this.destroy$.complete();

    // NIE
    // if(this.subscription) {
    //   this.subscription.unsubscribe();
    // }
  }
}
