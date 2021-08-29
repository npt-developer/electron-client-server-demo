// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import ENV_CONFIG from 'env.config';

export const environment = {
  production:  false,
};

export const DB_CONFIG = {
  host: ENV_CONFIG.database.host,
	port: ENV_CONFIG.database.port,
	database: ENV_CONFIG.database.database,
	username: ENV_CONFIG.database.username,
	password: ENV_CONFIG.database.password
};

export const LIST_PAGE = {
  pageSizeOptions: [1, 30, 100],
  pageSizeDefault: 1,
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
