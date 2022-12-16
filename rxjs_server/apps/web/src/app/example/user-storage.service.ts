import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  STORAGE_KEY = 'user';

  setUser(user) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  getUser() {
    const userFromStorage = localStorage.getItem(this.STORAGE_KEY);
    if (userFromStorage) {
      try {
        return JSON.parse(userFromStorage);
      } catch (error) {
        return null;
      }
    }
  }
}
