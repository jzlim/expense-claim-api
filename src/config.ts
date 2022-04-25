import * as dotenv from 'dotenv';
import { Algorithm } from 'jsonwebtoken';
dotenv.config();

// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT || 3000;

export const db = {
  name: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_USER_PWD || '',
};

export const logDirectory = process.env.LOG_DIR;

export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

export const JWT_EXPIRED_IN = process.env.EXPIRED_IN;
export const JWT_ALGO = process.env.ALGO as Algorithm || 'HS256';
