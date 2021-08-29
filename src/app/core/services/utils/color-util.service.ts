import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorUtilService {

  constructor() { }

  private numberToHex = (c: number) => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  /**
   * RGB color to Hex
   * http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
   * @example #ccffdd
   */
  rgbToHex = (r: number, g: number, b: number): string => {
    return `#${this.numberToHex(r)}${this.numberToHex(g)}${this.numberToHex(b)}`;
  }
}
