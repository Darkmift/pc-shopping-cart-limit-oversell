import { products } from '@/common/drizzle/db/schema';
import { type InferSelectModel } from 'drizzle-orm';

type ProductTableModel = InferSelectModel<typeof products>;

export interface IProductDTO extends InferSelectModel<typeof products> {}
export interface IProductCreateDTO
  extends Pick<ProductTableModel, 'name' | 'price' | 'amount'> {}
