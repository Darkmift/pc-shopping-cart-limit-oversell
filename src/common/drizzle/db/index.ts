import config from '@/common/config';
import { drizzle, type MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

export const poolConnection = mysql.createPool({
  host: config.MYSQL_HOST,
  user: config.MYSQL_USER,
  database: config.MYSQL_DATABASE,
});

const db: MySql2Database<typeof schema> = drizzle(poolConnection, {
  schema,
  mode: 'default',
  logger: true,
});

export default db;
