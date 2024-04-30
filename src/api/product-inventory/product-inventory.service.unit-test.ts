import { ProductInventoryService } from './product-inventory.service';
import { CartsService } from '../carts/carts.service';
import { ProductsService } from '../products/products.service';
import UsersService from '../users/users.service';
import logger from '@/common/utils/logger';
import { IProductCreateDTO } from '@/types/product';
import db from '@/common/drizzle/db';
import {
  carts,
  products,
  productsInventory,
  users,
} from '@/common/drizzle/db/schema';

describe('ProductInventoryService', () => {
  const cartService = new CartsService();
  const productService = new ProductsService();
  let service: ProductInventoryService;
  let cartId: number;
  let userId: number;

  beforeEach(async () => {
    userId = await UsersService.createUser({
      username: 'testuser-product-inv',
      password: 'testpassword',
    });
    const newCartId = await cartService.createCart(userId);
    if (!newCartId) {
      throw new Error('Error creating cart');
    }
    cartId = newCartId;
    service = new ProductInventoryService();
  });

  afterEach(async () => {
    await db.delete(productsInventory);
    await db.delete(products);
    await db.delete(carts);
    await db.delete(users);
  });

  // describe hello
  describe('hello', () => {
    it('should return "Hello from ProductInventoryService!"', () => {
      expect(service.getHello()).toEqual('Hello from ProductInventoryService!');
    });
  });

  // describe createInventoryProduct
  describe('createInventoryProduct', () => {
    it('should create a product in inventory', async () => {
      const product: IProductCreateDTO = {
        name: 'test product',
        price: 100,
        amount: 10,
      };
      const newProductId = await productService.createProduct(product);
      if (!newProductId) {
        fail('Error creating product');
      }

      const newProductInventoryId = await service.createInventoryProduct({
        productId: newProductId,
      });

      //expect number greater than 0
      expect(newProductInventoryId).toBeGreaterThan(0);
    });
  });
});
