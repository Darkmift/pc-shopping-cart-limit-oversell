import db from '@/common/drizzle/db';
import { products } from '@/common/drizzle/db/schema';
import { IProductCreateDTO } from '@/types/product';
import { sql } from 'drizzle-orm';

export class ProductsService {
  public getHello(): string {
    return 'Hello from ProductsService!';
  }

  public async getProducts() {
    const products = await db.query.products.findMany();
    return products;
  }

  public async getProductById(productId: number) {
    const prepared = db.query.products
      .findFirst({
        where: (products, { eq }) => eq(products.id, sql.placeholder('id')),
      })
      .prepare();

    const product = await prepared.execute({ id: productId });
    return product;
  }

  public async createProduct(product: IProductCreateDTO) {
    try {
      const newProduct = await db.insert(products).values(product).execute();
      const newProductId = newProduct[0].insertId;

      return newProductId;
    } catch (error) {
      console.error('Error creating product', error);
      return null;
    }
  }
}
