import logger from '@/utils/logger';
import dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';

// Ensure the test environment file is prioritized during tests
const envFile = `.env.${process.env.NODE_ENV}.local`;
dotenv.config({ path: [envFile, '.env'] });
logger.info(`Loading environment variables from ${envFile}`);

const env = cleanEnv(process.env, {
  PORT: num({ default: 3000 }),
  MYSQL_HOST: str(),
  MYSQL_PORT: num({ default: 3306 }),
  MYSQL_USER: str(),
  MYSQL_PASSWORD: str(),
  MYSQL_DATABASE: str(),
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
});

export default env;
