import { AppSidenavMenu } from "../sidenav/app-sidenav-menu";
import { APP_PATH } from "./app-path.constant";

export const APP_SIDENAV_MENU: AppSidenavMenu = [
  {
    title: 'Trang chủ',
    link: APP_PATH.dashboard,
    icon: 'home',
    level: 1,
  },
  // {
  //   title: 'Barcode',
  //   icon: 'barcode',
  //   isOpen: true,
  //   level: 1,
  //   children: [
  //     {
  //       title: 'Generator',
  //       link: APP_PATH.dashboard,
  //       icon: 'plus',
  //       level: 2,
  //     },
  //   ]
  // },
];