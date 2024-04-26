import { defineConfig } from 'drizzle-kit';
import config from './src/common/config';

export default defineConfig({
  schema: './src/common/drizzle/db/schema.ts',
  out: './migrations',
  driver: 'mysql2',
  dbCredentials: {
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    database: config.MYSQL_DATABASE,
  },
  verbose: true,
  strict: true,
});
