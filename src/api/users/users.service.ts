import { IUserDTO } from '@/types/user';
import db from '@/common/drizzle/db';
import { users } from '@/common/drizzle/db/schema';
import logger from '@/utils/logger';
import { eq, sql } from 'drizzle-orm';

export default class UsersService {
  private static userRowToDTO(row: any): IUserDTO {
    return {
      id: row.id,
      username: row.username,
      password: row.password,
      lastActive: row.lastActive,
      archived: row.archived,
    };
  }

  // fn that uses userRowToDTO on array
  private static usersManyRowsToDTO(rows: any[]): IUserDTO[] {
    return rows.map(this.userRowToDTO);
  }

  static async removeUserByUsername(username: string) {
    return await db.delete(users).where(eq(users.username, username));
  }

  static async getUsers(): Promise<IUserDTO[]> {
    try {
      const users = await db.query.users.findMany();
      return this.usersManyRowsToDTO(users);
    } catch (error) {
      logger.error(error);
      return [];
    }
  }

  static async getUserById(id: string): Promise<IUserDTO | null> {
    try {
      const prepared = db.query.users
        .findFirst({
          where: (users, { eq }) => eq(users.id, sql.placeholder('id')),
        })
        .prepare();

      const user = await prepared.execute({ id });
      return this.userRowToDTO(user);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  // get user by username
  static async getUserByUsername(username: string): Promise<IUserDTO | null> {
    try {
      const prepared = db.query.users
        .findFirst({
          where: (users, { eq }) =>
            eq(users.username, sql.placeholder('username')),
        })
        .prepare();

      const user = await prepared.execute({ username });
      return this.userRowToDTO(user);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  static async createUser(user: IUserDTO): Promise<boolean> {
    try {
      const newUser = await db.insert(users).values({
        username: user.username,
        password: user.password,
      });

      return !!newUser;
    } catch (error) {
      logger.error(error);
      return false;
    }
  }
}
