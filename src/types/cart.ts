import { type InferSelectModel } from 'drizzle-orm';
import { carts } from '@/common/drizzle/db/schema';

type CartTableModel = InferSelectModel<typeof carts>;

export interface ICartDTO extends InferSelectModel<typeof carts> {}
export interface ICartCreateDTO extends Pick<CartTableModel, 'userId'> {}