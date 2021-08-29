import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  /**
   * Get item
   */
  getItem<T>(key: string): T {
    const dataTemp: string = window.sessionStorage.getItem(key);
    let data: T = null;
    if (dataTemp !== null) {
      try {
        data = JSON.parse(dataTemp);
      } catch (err) {

      }
    }
    return data;
  }

  setItem(key: string, value: object) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    window.sessionStorage.removeItem(key);
  }
}
