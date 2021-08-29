import ENV_CONFIG from 'env.config';

export const environment = {
  production:  true,
};

export const DB_CONFIG = {
  host: ENV_CONFIG.database.host,
	port: ENV_CONFIG.database.port,
	database: ENV_CONFIG.database.database,
	username: ENV_CONFIG.database.username,
	password: ENV_CONFIG.database.password
};

export const LIST_PAGE = {
  pageSizeOptions: [10, 30, 100],
  pageSizeDefault: 10,
};
