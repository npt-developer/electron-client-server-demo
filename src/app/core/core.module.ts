import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppInitService } from './services/app-init.service';
import { LocalStorageService } from './services/storage/local-storage.service';
import { SessionStorageService } from './services/storage/session-storage.service';
import { ToastrModule } from 'ngx-toastr';
import { ToastService } from './services/toast.service';
import { NodeModuleUtilService } from './services/node-module-util.service';
import { ElectronService } from './services/electron.service';
import { AppService } from './services/app.service';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  providers: [
    // app init config
    AppInitService,


    NodeModuleUtilService,
    AppService,
    ElectronService,
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitService.initializeFactory,
      deps: [AppInitService],
      multi: true,
    },
    
    ToastService,

    // client storage
    LocalStorageService,
    SessionStorageService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
