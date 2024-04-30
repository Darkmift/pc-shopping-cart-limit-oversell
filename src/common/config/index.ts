import dotenv from 'dotenv';
import logger from '@/common/utils/logger';
import { cleanEnv, num, str } from 'envalid';

// Ensure the test environment file is prioritized during tests
const envFile = `.env.${process.env.NODE_ENV}.local`;
dotenv.config({ path: [envFile, '.env'] });
logger.info(`Loading environment variables from ${envFile}`);

const env = cleanEnv(process.env, {
  PORT: num({ default: 3000 }),
  MYSQL_HOST: str(),
  MYSQL_PORT: num(),
  MYSQL_USER: str({ default: 'root' }),
  MYSQL_PASSWORD: str(),
  MYSQL_DATABASE: str(),
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  JWT_SECRET: str(),
});

export default env;
