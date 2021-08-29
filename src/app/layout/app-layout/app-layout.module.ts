import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app-layout.component';
import { AppLayoutSidenavMenuComponent } from './components/app-layout-sidenav-menu/app-layout-sidenav-menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';




@NgModule({
  declarations: [AppLayoutComponent, AppLayoutSidenavMenuComponent],
  imports: [
    CommonModule,
    RouterModule,

    FlexLayoutModule,

    // ng zorrro
    NzLayoutModule,
    NzIconModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzMenuModule,
  ],
  exports: [
    AppLayoutComponent,
  ]
})
export class AppLayoutModule { }
