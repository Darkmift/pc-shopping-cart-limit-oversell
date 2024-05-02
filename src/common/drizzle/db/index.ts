import config from '@/common/config';
import { drizzle, type MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import logger from '@/common/utils/logger';
import { Logger } from 'drizzle-orm/logger';
import { MySqlTransactionConfig } from 'drizzle-orm/mysql-core/session';
import {
  DROP_IF_EXISTS_ADD_ITEMS_TO_CART_PROCEDURE,
  ADD_ITEMS_TO_CART_PROCEDURE,
} from './queries/addItemsToCart';

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

class MyLogWriter implements Logger {
  logQuery(query: string, params: unknown[]): void {
    logger.info({ query, params });
  }
}

const db: MySql2Database<typeof schema> = drizzle(poolConnection, {
  schema,
  mode: 'default',
  logger: new MyLogWriter(),
});

export default db;

export const TRNASACTIONS_RUN_CONFIG: MySqlTransactionConfig = {
  isolationLevel: 'read committed',
  accessMode: 'read write',
  withConsistentSnapshot: true,
};

export const seedData = async () => {
  try {
    logger.info('Seeding MYSQL data');
    // create the stored procedure
    await db.execute(DROP_IF_EXISTS_ADD_ITEMS_TO_CART_PROCEDURE);
    await db.execute(ADD_ITEMS_TO_CART_PROCEDURE);
  } catch (error) {
    logger.error('Error seeding data', error);
    // crash the process if seeding fails
    process.exit(1);
  }
};
