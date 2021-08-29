import { Component, Input, OnInit } from '@angular/core';
import { AppSidenavMenu } from 'src/app/common/sidenav/app-sidenav-menu';

@Component({
  selector: 'app-app-layout-sidenav-menu',
  templateUrl: './app-layout-sidenav-menu.component.html',
  styleUrls: ['./app-layout-sidenav-menu.component.scss']
})
export class AppLayoutSidenavMenuComponent implements OnInit {

  @Input() isCollapsed: boolean = false;
  @Input() menus: AppSidenavMenu;

  
  constructor() { }

  ngOnInit(): void {
  }

}
