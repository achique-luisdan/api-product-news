require('dotenv').config();

const configs = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  pathInitial: process.env.PATH_INITIAL || '/api',
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  apiKey: process.env.API_KEY,
  secret: process.env.SECRET_KEY,
  secretSession: process.env.SECRET_SESSION,
  sessionTimeout: process.env.SESSION_TIMEOUT,
};

module.exports = { configs };
