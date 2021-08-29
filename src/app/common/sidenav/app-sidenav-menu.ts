interface IAppSidenavMenu {
  title: string;
  link?: string;
  icon?: string;
  level: number;
  permissionName?: string;
  isOpen?: boolean; // submenu
  isSelected?: boolean;
  isDisabled?: boolean;
  children?: IAppSidenavMenu[]; //submenu
};

export type AppSidenavMenu = IAppSidenavMenu[];