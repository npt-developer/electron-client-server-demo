import { Injectable } from '@angular/core';
import * as fs from 'fs';
import * as path from 'path';
import * as knex from 'knex';
import * as objection from 'objection';
import * as electron from 'electron';
import * as electronLog from 'electron-log';

@Injectable({
  providedIn: 'root'
})
export class NodeModuleUtilService {

  constructor() { }

  /**
   * Get node module base on window.require('electron').remote.required(<module-name>)
   * Ex)
   * import * as fs from 'fs';
   * const fsNode = this.getModule('fs') as typeof fs;
   */
  public getModule = (moduleName: string) => {
    return window.require('electron').remote.require(moduleName);
    // const remote = window.require('electron').remote;
    // switch (moduleName) {
    //   case 'fs':
    //     const fsApp: typeof fs = remote.require('fs');
    //     return fsApp;
    //   case 'path':
    //     const pathApp: typeof path = remote.require('path');
    //     return pathApp;
    // }
    // return null;
  }

  public electron = (): typeof electron => {
    return window.require('electron');
  }

  public electronLog = () => {
    const module: typeof electronLog = window.require('electron').remote.require('electron-log');
    return module;
  }

  public fs = () => {
    const module: typeof fs = window.require('electron').remote.require('fs');
    return module;
  }

  public path = () => {
    const module: typeof path = window.require('electron').remote.require('path');
    return module;
  }

  public knex = () => {
    const module: typeof knex = window.require('electron').remote.require('knex');
    return module;
  }

}
