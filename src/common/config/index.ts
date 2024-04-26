import dotenv from 'dotenv';
dotenv.config({ path: ['.env.development.local', '.env'] });
import { cleanEnv, str, email, json } from 'envalid';

const env = cleanEnv(process.env, {
  PORT: str({ default: '3000' }),
  MYSQL_HOST: str(),
  MYSQL_USER: str(),
  MYSQL_PASSWORD: str(),
  MYSQL_DATABASE: str(),
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
});

export default env;
