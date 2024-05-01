import db from '@/common/drizzle/db';
import { productsInventory } from '@/common/drizzle/db/schema';
import logger from '@/common/utils/logger';
import {
  IProductInventoryCreateDTO,
  IProductInventoryDTO,
} from '@/types/product-inventory';
import { and, eq, isNull, sql } from 'drizzle-orm';

export class ProductInventoryService {
  public getHello(): string {
    return 'Hello from ProductInventoryService!';
  }

  // get all products in inventory
  // public async getInventoryProducts() {
  //   const inventoryProducts = await db.query.productsInventory.findMany();
  //   return inventoryProducts;
  // }

  // get product in inventory by id
  public async getInventoryProductById(productId: number) {
    const prepared = db.query.productsInventory
      .findFirst({
        where: (productsInventory, { eq }) =>
          eq(productsInventory.id, sql.placeholder('id')),
      })
      .prepare();

    const inventoryProduct = await prepared.execute({ id: productId });
    return inventoryProduct;
  }

  // create product in inventory
  public async createInventoryProduct(product: IProductInventoryCreateDTO) {
    try {
      const newProduct = await db
        .insert(productsInventory)
        .values(product)
        .execute();
      const newProductId = newProduct[0].insertId;

      return newProductId;
    } catch (error) {
      logger.error('Error creating product', error);
      return null;
    }
  }

  // create multiple products in inventory at once args (productId,amount)
  public async createMultipleInventoryProducts(
    productId: number,
    amount: number,
  ) {
    try {
      const newProductToInsert: IProductInventoryCreateDTO[] = Array.from(
        { length: amount },
        () => ({
          productId,
        }),
      );
      const newProducts = await db
        .insert(productsInventory)
        .values(newProductToInsert)
        .execute();

      return newProducts[0].affectedRows;
    } catch (error) {
      logger.error('Error creating products', error);
      return null;
    }
  }

  // assign cartId to product in inventory
  public async addProductInventoryItemToCart(
    productId: number,
    cartId: number,
    amount: number,
  ): Promise<IProductInventoryDTO[]> {
    try {
      const transaction = await db.transaction(async (tx) => {
        const availableProductInventory = await tx
          .select()
          .from(productsInventory)
          .where(
            and(
              isNull(productsInventory.cartId),
              eq(productsInventory.productId, productId),
            ),
          )
          .limit(amount);

        if (
          !availableProductInventory ||
          availableProductInventory.length < amount
        ) {
          await tx.rollback();
          return null;
        }

        for (let index = 0; index < availableProductInventory.length; index++) {
          const availableItemitem = availableProductInventory[index];

          await tx
            .update(productsInventory)
            .set({
              cartId,
            })
            .where(and(eq(productsInventory.id, availableItemitem.id)));
        }

        return availableProductInventory;
      });

      return transaction || [];
    } catch (error) {
      logger.error('Error assigning cart to product', error);
      return [];
    }
  }

  // remove product from cart
  public async removeProductFromCart(
    inventoryProductId: number,
  ): Promise<boolean> {
    try {
      const removedProduct = await db
        .update(productsInventory)
        .set({
          cartId: null,
        })
        .where(eq(productsInventory.id, inventoryProductId));

      return removedProduct[0].affectedRows > 0;
    } catch (error) {
      logger.error('Error removing product from cart', error);
      return false;
    }
  }
}
