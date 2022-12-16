import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { ListComponent } from '../components/list/list.component';
import { ajax } from '../utils/ajax-promise';
import { LoginDto, SessionDto, ProfileModel } from "@core";

@Component({
  template: `
    <mat-toolbar>Promise</mat-toolbar>
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
export class PromisesComponent implements AfterViewInit {
  @ViewChild('btn', { read: ElementRef })
  btn: ElementRef;
  @ViewChild('email', { read: ElementRef })
  email: ElementRef;
  @ViewChild('password', { read: ElementRef })
  password: ElementRef;

  profile: ProfileModel = null;

  constructor(private list: ListComponent) {}

  async ngAfterViewInit() {
    const log = (...args) => this.list.add(...args);
    const button = this.btn.nativeElement;
    const email = this.email.nativeElement;
    const password = this.password.nativeElement;

    /**
     * ajax.post(url, data, onSuccess, onError)
     *
     * /api/login   => {email, password} => LoginDto
     * /api/session => {token}           => SessionDto
     * /api/profile => {userId}          => ProfileModel
     */
    const onClick = e => {


    };

    // TODO async version of onClick()

    button.addEventListener('click', onClick);

    // a co z usunięciem się
    // button.removeEventListener('click', onClick);
  }
}
