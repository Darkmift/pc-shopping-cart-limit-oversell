import { type InferSelectModel } from 'drizzle-orm';
import { productsInventory } from '@/common/drizzle/db/schema';

type ProductInventoryTableModel = InferSelectModel<typeof productsInventory>;

export interface IProductInventoryDTO
  extends InferSelectModel<typeof productsInventory> {}
export interface IProductInventoryCreateDTO
  extends Pick<ProductInventoryTableModel, 'cartId'> {
  amount: number;
}
