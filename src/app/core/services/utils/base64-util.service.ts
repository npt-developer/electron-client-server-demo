import { Injectable } from '@angular/core';
import { WindowService } from '../window.service';

@Injectable({
  providedIn: 'root'
})
export class Base64UtilService {

  constructor(
    private _windowService: WindowService,
  ) { }

  /**
   * ArrayBuffer to base64 string
   * https://gist.github.com/Deliaz/e89e9a014fea1ec47657d1aac3baa83c
   */
  arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary: string = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return this._windowService.window.btoa(binary);
  }
}
