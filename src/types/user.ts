import { type InferSelectModel } from 'drizzle-orm';
import { users } from '@/common/drizzle/db/schema';

type UserTableModel = InferSelectModel<typeof users>;

export interface IUserDTO extends InferSelectModel<typeof users> {}
export interface IUserCreateDTO
  extends Pick<UserTableModel, 'username' | 'password'> {}

export type ITableRowId = UserTableModel['id'];
