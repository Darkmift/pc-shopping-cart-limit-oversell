import db from '@/common/drizzle/db';
import { carts } from '@/common/drizzle/db/schema';
import logger from '@/common/utils/logger';
import { and, eq, sql } from 'drizzle-orm';

export class CartsService {
  public getHello(): string {
    return 'Hello from CartsService!';
  }

  public async getCartsForUser(userId: number) {
    const prepared = db.query.carts
      .findMany({
        where: (carts, { eq }) =>
          and(
            eq(carts.userId, sql.placeholder('userId')),
            eq(carts.isActive, 1),
          ),
      })
      .prepare();

    const carts = await prepared.execute({ userId });
    return carts;
  }

  public async getCartById(cartId: number) {
    const prepared = db.query.carts
      .findFirst({
        where: (carts, { eq }) =>
          and(eq(carts.id, sql.placeholder('id')), eq(carts.isActive, 1)),
      })
      .prepare();

    const cart = await prepared.execute({ id: cartId });
    return cart;
  }

  public async createCart(userId: number) {
    try {
      const cart = await db.insert(carts).values({
        userId,
      });

      return cart[0].insertId;
    } catch (error) {
      logger.error('Error creating cart', error);
      return null;
    }
  }

  public async archiveCart(cartId: number) {
    // TODO add CartItemsService to free all cart items back to inventory
    return await db
      .update(carts)
      .set({
        isActive: 0,
      })
      .where(eq(carts.id, cartId));
  }
}
