import { FactoryProvider, InjectionToken, Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  window: Window;

  constructor(@Inject(DOCUMENT) private _document: Document) {
    this.window = this._document.defaultView;
  }
}
