import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app-layout/app-layout.component";


const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/app-dashboard/app-dashboard.module').then(m => m.AppDashboardModule),
      },
      // {
      //   path: '**',
      //   component: FrontErrorPageNotFoundComponent,
      // }
    ],
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    useHash: false,
    // scroll to (0,0) when router change
    scrollPositionRestoration: 'enabled',
    // for universal
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
}),
  ],
  exports: [
    RouterModule,
  ],
  providers: [],
})
export class AppRoutingModule {}