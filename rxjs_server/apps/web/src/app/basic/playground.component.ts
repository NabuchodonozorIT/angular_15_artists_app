import {
  Component,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { ListComponent } from '../components/list/list.component';

@Component({
  template: `
    <mat-toolbar>Playground</mat-toolbar>
    <button #btn mat-raised-button color="primary">Button</button>
  `
})
export class BasicPlaygroundComponent implements AfterViewInit, OnDestroy {

  @ViewChild('btn', { read: ElementRef })
  btn: ElementRef;

  constructor(private list: ListComponent) { }

  ngAfterViewInit() {
    const button = this.btn.nativeElement;
    const log = this.list.logger();

    // WORK

    button.addEventListener('click', log);
  }

  ngOnDestroy(): void {
    console.log('dest', this.btn.nativeElement);
  }
}
