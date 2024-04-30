import 'tsconfig-paths/register';
import db from '@/common/drizzle/db';
import {
  users,
  carts,
  products,
  productsInventory,
} from './common/drizzle/db/schema';
import { poolConnection } from '@/common/drizzle/db';

export default async () => {
  await db.delete(productsInventory);
  await db.delete(products);
  await db.delete(carts);
  await db.delete(users);
  console.log('Global teardown init');
  await poolConnection.end();
  console.log('Global teardown complete');
};
