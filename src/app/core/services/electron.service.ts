import { Injectable } from '@angular/core';
import * as  electron from 'electron';
import { AppService } from './app.service';
import { NodeModuleUtilService } from './node-module-util.service';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  _ipcRenderer: electron.IpcRenderer;
  appVersion: string;
  rootPath: string;

  constructor(
    private _nodeModule: NodeModuleUtilService,
    private _appService: AppService,
  ) {}

  public init() {
    const elec: typeof electron = this._nodeModule.electron();
    this._ipcRenderer = elec.ipcRenderer;
    this.initIpcRenderer();

    this.rootPath = this._nodeModule.electron().remote.app.getAppPath();
    console.log('rootpath', this.rootPath);
    // init log
    const log = this._nodeModule.electronLog();
    log.transports.file.level = 'error';
    log.transports.console.level = false;
  }

  public logError(tag: string, error) {
    let message: string;
    if (typeof error === 'string') {
      message = error;
    } else {
      message = error?.message;
    }
    this._nodeModule.electronLog().error(`${tag}: ${message}`);
  }

  private initIpcRenderer() {
    this._ipcRenderer.on('app:close', (event, arg) => {
      console.log(`app:close`);
      this._appService.onAppClose();
      this._ipcRenderer.send('app:closed');
    });
  }
}
