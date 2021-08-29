import { Injectable } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import { environment } from 'src/environments/environment';
import { ElectronService } from './electron.service';

@Injectable()
export class AppInitService {

  constructor(
    private _iconService: NzIconService,
    private _electronService: ElectronService,
  ) {
  }

  public init(): Promise<void> {

    return new Promise<void>((resolve, reject) => {
      // or load config from server

      // electron init
      // because electron roolPath: call before call nzIconChangeAssetsSource
      this._electronService.init();

      // Change ng zorro icon asset source to /assets/icons
      this.nzIconChangeAssetsSource();
      
      resolve();
    });
  }

  /**
   * Change ng zorro icon asset source to /assets/icons
   */
  protected nzIconChangeAssetsSource() {
    // change assets resource of nz icon from /assets to /assets/icons/assets
    if (environment.production) {
      this._iconService.changeAssetsSource(`file:///${this._electronService.rootPath}/dist/app/assets/icons`);
    } else {
      this._iconService.changeAssetsSource('/assets/icons/');
    }
  }

  public static initializeFactory(appInitService: AppInitService) {
    return (): Promise<any> => { 
      return appInitService.init();
    }
  }
}