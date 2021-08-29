import { AppBreadcrumb } from "../breadcrumb/app-breadcrumb";

export interface IAppRouterData<T> {
  breadcrumbs?: AppBreadcrumb[];
  data?: T;
  permission?: string;
}