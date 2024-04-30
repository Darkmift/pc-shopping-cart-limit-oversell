import config from '@/common/config';
import { drizzle, type MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import logger from '@/common/utils/logger';

export const poolConnection = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  password: config.MYSQL_PASSWORD,
  user: config.MYSQL_USER,
  database: config.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  // debug: true,
});

poolConnection.on('connection', (connection) => {
  logger.info('MySQL connection established');
});

poolConnection.on('acquire', (connection) => {
  logger.info('MySQL connection acquired');
});

poolConnection.on('enqueue', () => {
  logger.info('Waiting for available connection slot');
});

poolConnection.on('release', (connection) => {
  logger.info('MySQL connection released');
});

const db: MySql2Database<typeof schema> = drizzle(poolConnection, {
  schema,
  mode: 'default',
});

export default db;
