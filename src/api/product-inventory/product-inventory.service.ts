import db, { TRNASACTIONS_RUN_CONFIG } from '@/common/drizzle/db';
import { productsInventory } from '@/common/drizzle/db/schema';
import logger from '@/common/utils/logger';
import {
  IProductInventoryCreateDTO,
  IProductInventoryDTO,
} from '@/types/product-inventory';
import { SQL, and, eq, inArray, isNull, sql } from 'drizzle-orm';

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

  // get all products in inventory by cartId
  public async getInventoryProductsByCartId(cartId: number) {
    const prepared = db.query.productsInventory
      .findMany({
        where: eq(productsInventory.cartId, sql.placeholder('cartId')),
      })
      .prepare();

    const inventoryProducts = await prepared.execute({ cartId });
    return inventoryProducts;
  }

  // get all products in inventory by productId
  public async getInventoryProductsByProductId(productId: number) {
    const prepared = db.query.productsInventory
      .findMany({
        where: eq(productsInventory.productId, sql.placeholder('productId')),
      })
      .prepare();

    const inventoryProducts = await prepared.execute({ productId });
    return inventoryProducts;
  }

  // create product in inventory
  public async createInventoryProduct(product: IProductInventoryCreateDTO) {
    try {
      const newProduct = await db.insert(productsInventory).values(product);
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
        .values(newProductToInsert);

      return newProducts[0].affectedRows;
    } catch (error) {
      logger.error('Error creating products', error);
      return null;
    }
  }

  public async addProductInventoryItemToCartLegacy(
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
        }

        // Constructing a CASE statement dynamically
        const caseSql = sql`CASE ${sql.join(
          availableProductInventory.map(
            (item) => sql`WHEN id = ${item.id} THEN ${cartId}`,
          ),
          ' ',
        )} ELSE cartId END`;

        // Execute a single update operation to set the cartId for all selected inventory items using a CASE statement
        await tx
          .update(productsInventory)
          .set({ cartId: caseSql })
          .where(
            inArray(
              productsInventory.id,
              availableProductInventory.map((item) => item.id),
            ),
          );

        return availableProductInventory;
      });

      return transaction ?? [];
    } catch (error) {
      logger.error('Error assigning cart to product', error);
      return [];
    }
  }

  public async addProductInventoryItemToCart(
    productId: number,
    cartId: number,
    amount: number,
  ): Promise<IProductInventoryDTO[]> {
    try {
      // Call the stored procedure to handle the inventory assignment
      const query = sql.raw(`
        CALL addItemsToCart(${cartId}, ${productId}, ${amount});
      `);

      // Execute the stored procedure
      const transaction = (await db.execute(
        query,
      )) as unknown as IProductInventoryDTO[];

      return transaction ?? [];
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

  public async removeMultipleProductsFromCart(
    inventoryProductIds: number[],
  ): Promise<boolean> {
    try {
      // Check if inventoryProductIds is not empty to prevent unwanted full table updates
      if (!inventoryProductIds.length) {
        throw new Error('No product IDs provided.');
      }

      // Prepare the CASE statement using SQL templating
      const sqlParts: SQL[] = inventoryProductIds.map(
        (id) => sql`WHEN id = ${id} THEN NULL`,
      );
      const caseStatement = sql`CASE ${sql.join(
        sqlParts,
        ' ',
      )} ELSE cartId END`;

      // Execute the update operation
      const result = await db
        .update(productsInventory)
        .set({ cartId: caseStatement })
        .where(inArray(productsInventory.id, inventoryProductIds)); // Utilizing a properly implemented inArray method

      // Check if any rows were affected
      return result[0].affectedRows > 0;
    } catch (error) {
      logger.error('Error removing products from cart', error);
      return false;
    }
  }
}
