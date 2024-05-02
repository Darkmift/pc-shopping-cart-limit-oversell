import db from '@/common/drizzle/db';
import { ProductsService } from './products.service';
import { products } from '@/common/drizzle/db/schema';

describe.skip('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    service = new ProductsService();
  });

  afterAll(async () => {
    await db.delete(products);
  });

  //describe hello
  describe('hello', () => {
    it('should return "Hello from ProductsService!"', () => {
      expect(service.getHello()).toEqual('Hello from ProductsService!');
    });
  });

  // describe createProduct
  describe('createProduct', () => {
    it('should create a product', async () => {
      const product = {
        name: 'test product',
        price: 100,
        amount: 10,
      };
      const newProductId = await service.createProduct(product);
      expect(newProductId).toBeGreaterThan(0);
    });
  });

  // describe getProducts
  describe('getProducts', () => {
    it('should return an array of products', async () => {
      const products = await service.getProducts();
      // expect array of products  with object having id, name, price, amount
      expect(products).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number),
            amount: expect.any(Number),
          }),
        ]),
      );
    });
  });

  // describe getProductById
  describe('getProductById', () => {
    it('should return a product by id', async () => {
      const product = {
        name: 'test product',
        price: 100,
        amount: 10,
      };
      const newProductId = await service.createProduct(product);
      if (!newProductId) {
        fail('Error creating product');
      }

      const foundProduct = await service.getProductById(newProductId);
      expect(foundProduct).toEqual({
        id: newProductId,
        name: 'test product',
        archived: 0,
        price: 100,
        amount: 10,
      });
    });
  });
});
