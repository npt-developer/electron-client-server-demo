import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /**
   * Get item
   */
  getItem<T>(key: string): T {
    const dataTemp: string = window.localStorage.getItem(key);
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
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    window.localStorage.removeItem(key);
  }
}
