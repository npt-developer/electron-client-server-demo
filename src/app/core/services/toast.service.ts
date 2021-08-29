import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private _toastrService: ToastrService,
  ) { }

  error = (message: string, title?: string) => {
    this._toastrService.error(message, title);
  }

  success = (message: string, title?: string) => {
    this._toastrService.success(message, title);
  }

}
