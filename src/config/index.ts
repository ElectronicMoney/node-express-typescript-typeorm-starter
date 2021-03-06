import * as dotenv from 'dotenv';

dotenv.config()
dotenv.config({ path: __dirname+'../.env' });

// APP_URL
export const APP_URL = process.env.APP_URL;
// API_URL
export const API_URL = process.env.API_URL;

// API PORT
export const PORT = process.env.PORT;
// # API Version
export const API_VERSION = process.env.API_VERSION;

// Secrete Keys
export const ACCESS_TOKEN_SECRETE  = process.env.ACCESS_TOKEN_SECRETE;
export const REFRESH_TOKEN_SECRETE = process.env.REFRESH_TOKEN_SECRETE;

// # DTABASE CONFIGURATIONS
export const DATABASE_TYPE = process.env.DATABASE_TYPE;
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_PORT = process.env.DATABASE_PORT;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

export const PROFILES_UPLOAD = process.env.PROFILES_UPLOAD;
export const POSTS_UPLOAD    = process.env.POSTS_UPLOAD;