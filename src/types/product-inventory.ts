import { productsInventory } from '@/common/drizzle/db/schema';
import { type InferSelectModel } from 'drizzle-orm';

type ProductInventoryTableModel = InferSelectModel<typeof productsInventory>;
export interface IProductInventoryDTO extends ProductInventoryTableModel {}

export interface IProductInventoryCreateDTO
  extends Pick<IProductInventoryDTO, 'productId'> {}
