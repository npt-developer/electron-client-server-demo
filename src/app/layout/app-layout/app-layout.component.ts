import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppBreadcrumb } from 'src/app/common/breadcrumb/app-breadcrumb';
import { APP_SIDENAV_MENU } from 'src/app/common/constants/app-sidenav-menu.constant';
import { AppSidenavMenu } from 'src/app/common/sidenav/app-sidenav-menu';
import { AppService } from 'src/app/core/services/app.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  menus: AppSidenavMenu = APP_SIDENAV_MENU;

  isShowUserInfoMenu: boolean = false;
  isCollapsed$: Observable<boolean>;
  breadcrumbs$: Observable<AppBreadcrumb[]> = this._appService.breadcrumb$.asObservable().pipe(
      delay(0), // breadcrumbs fix Expression has changed after it was checked
    );
  isPrinter$: Observable<boolean> = this._appService.isPrinter$.asObservable();

  unsubscribe$: Subject<void> = new Subject();
  subscription: Subscription = new Subscription();

  constructor(
    private _router: Router,
    private _appService: AppService,
  ) {
    this.isCollapsed$ = this._appService.collapsedSideNav$.asObservable();
  }

  ngOnInit() {
    const routerEndDataSubscription: Subscription = this._appService.routerEndData$.subscribe(routerData => {
      this.updateSidenavMenu(this.menus); // update seleted menu only when init
    });
    this.subscription.add(routerEndDataSubscription);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.subscription.unsubscribe();
  }


  onToggleCollapsedSideNav() {
    this._appService.toggleCollapsedSideNav();
  }

  /**
   * Update menu
   * - Set selected menu item
   * - Set isOpen menu parent
   */
  private updateSidenavMenu(menuList: AppSidenavMenu, menuParentList: AppSidenavMenu = []) {
    menuList.forEach(menu => {
      if (menu.children) {
        menuParentList.push(menu);
        this.updateSidenavMenu(menu.children, menuParentList)
      } else {
        const isActive: boolean = this._router.isActive(menu.link!, true);
        menu.isSelected = isActive;
        if (isActive) {
          menuParentList.forEach(menuParentItem => {
            menuParentItem.isOpen = true;
          })
          return;
        }
      }
    })
  }

}
