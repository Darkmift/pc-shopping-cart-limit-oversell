import 'tsconfig-paths/register';
import { poolConnection } from '@/common/drizzle/db';

export default async () => {
  console.log('Global teardown init');
  await poolConnection.end();
  console.log('Global teardown complete');
};
