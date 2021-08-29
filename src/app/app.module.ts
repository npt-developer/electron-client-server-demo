import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData, CommonModule } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { AppLayoutModule } from './layout/app-layout/app-layout.module';
import { IconsProviderModule } from './icons-provider.module';
import { ToastrModule } from 'ngx-toastr';



registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // angular
    CommonModule,
    BrowserAnimationsModule,
    
    ToastrModule.forRoot(), // ToastrModule added
    
    // core
    CoreModule,
    // layout
    AppLayoutModule,
    
    // app
    AppRoutingModule,
    
    HttpClientModule,
    // ng zorro
    IconsProviderModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: vi_VN },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
