import 'tsconfig-paths/register';
import { seedData } from '@/common/drizzle/db';

export default async () => {
  await seedData();
};
