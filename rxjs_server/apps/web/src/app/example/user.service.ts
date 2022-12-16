import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { UserStorageService } from './user-storage.service';

export interface User {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user$ = new BehaviorSubject<User | null>(null);

  get user$() {
    return this._user$.asObservable();
  }

  get user() {
    return this._user$.getValue();
  }

  constructor(storage: UserStorageService) {
    this._user$.next(storage.getUser());

    this._user$.subscribe(user => {
      storage.setUser(user);
    });
  }

  logout() {
    return ajax
      .getJSON<User>('/api/user/logout')
      .pipe(tap(() => this._user$.next(null)));
  }

  login(email, pass): Observable<User> {
    return ajax
      .getJSON<User>('/api/user/login')
      .pipe(tap(user => this._user$.next(user)));
  }
}
