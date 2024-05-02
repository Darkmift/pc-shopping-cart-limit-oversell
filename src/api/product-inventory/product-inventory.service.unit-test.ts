import { ProductInventoryService } from './product-inventory.service';
import { CartsService } from '../carts/carts.service';
import { ProductsService } from '../products/products.service';
import UsersService from '../users/users.service';

describe('ProductInventoryService', () => {
  let service: ProductInventoryService;
  let cartId: number;
  let userId: number;
  let productId: number;
  let inventoryProductId: number;

  beforeAll(async () => {
    const cartService = new CartsService();
    const productService = new ProductsService();
    // make user for cart
    userId = await UsersService.createUser({
      username: 'testuser-product-inv' + Date.now(),
      password: 'testpassword',
    });
    // make cart for product-inventory
    const newCartId = await cartService.createCart(userId);
    if (!newCartId) {
      throw new Error('Error creating cart');
    }
    cartId = newCartId;
    // make product for product-inventory
    const newProductId = await productService.createProduct({
      name: 'test product',
      price: 100,
      amount: 10,
    });
    if (!newProductId) {
      throw new Error('Error creating product');
    }
    productId = newProductId;

    service = new ProductInventoryService();
  });

  // describe hello
  describe('Get hello - Service is defined', () => {
    it('should return "Hello from ProductInventoryService!"', () => {
      expect(service.getHello()).toEqual('Hello from ProductInventoryService!');
    });
  });

  // describe createInventoryProduct
  describe('createInventoryProduct', () => {
    it('should create a product in inventory', async () => {
      console.log('🚀 ~ it ~ productId:', productId);
      const newProductInventoryId = await service.createInventoryProduct({
        productId,
      });
      if (!newProductInventoryId) {
        throw new Error('Error creating product in inventory');
      }
      inventoryProductId = newProductInventoryId;
      //expect number greater than 0
      expect(newProductInventoryId).toBeGreaterThan(0);
    });
  });

  // getInventoryProductById
  describe('getInventoryProductById', () => {
    it('should get product in inventory by id', async () => {
      const inventoryProduct = await service.getInventoryProductById(
        inventoryProductId,
      );
      //expect inventoryProduct to be defined
      expect(inventoryProduct).toBeDefined();
    });
  });

  // createMultipleInventoryProducts
  describe('createMultipleInventoryProducts', () => {
    it('should create multiple products in inventory at once', async () => {
      const newProductsAmount = 5;
      const affectedRows = await service.createMultipleInventoryProducts(
        productId,
        newProductsAmount,
      );
      //expect affectedRows to be equal to newProductsAmount
      expect(affectedRows).toEqual(newProductsAmount);
    });
  });

  // TODO: Fix this broken logic
  // addProductToCart
  describe.skip('addProductToCart', () => {
    it('should add product to cart', async () => {
      const addedProduct = await service.addProductInventoryItemToCart(
        productId,
        cartId,
        10,
      );
      //expect addedProduct to be { id,productId,cartId}
      expect(addedProduct).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          productId: expect.any(Number),
          cartId: expect.any(Number),
        }),
      );
    });
  });

  // TODO: Fix this broken logic -- will test after fixing addProductToCart
  // getInventoryProductsByCartId
  describe.skip('getInventoryProductsByCartId', () => {
    it('should get all products in inventory by cartId', async () => {
      const inventoryProducts = await service.getInventoryProductsByCartId(
        cartId,
      );
      //expect inventoryProducts to be { id,prouctId,cartId }
      expect(inventoryProducts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            productId: expect.any(Number),
            cartId: expect.any(Number),
          }),
        ]),
      );
    });
  });

  // removeProductFromCart
  describe('removeProductFromCart', () => {
    it('should remove product from cart', async () => {
      const removedProduct = await service.removeProductFromCart(
        inventoryProductId,
      );
      //expect removedProduct to be defined
      expect(removedProduct).toBeDefined();
    });
  });

  // removeMultipleProductsFromCart
  // describe('removeMultipleProductsFromCart', () => {
  //   it('should remove multiple products from cart', async () => {
  //     // create 10 products in inventory
  //     const newProductsAmount = 10;
  //     const affectedRows = await service.createMultipleInventoryProducts(
  //       productId,
  //       newProductsAmount,
  //     );

  //     const removedProducts = await service.removeMultipleProductsFromCart(
  //       productId,
  //       cartId,
  //       10,
  //     );
  //     //expect removedProducts to be defined
  //     expect(removedProducts).toBeDefined();
  //   });
  // });
});
