import { CartsService } from './carts.service';
import UsersService from '../users/users.service';
import { IUserCreateDTO, IUserDTO } from '@/types/user';

describe('CartsService', () => {
  let service: CartsService;
  let cartOwner: IUserDTO;

  beforeAll(async () => {
    const newUser: IUserCreateDTO = {
      username: 'test-carts',
      password: 'test-carts',
    };
    await UsersService.createUser(newUser);
    let userCreated = await UsersService.getUserByUsername(newUser.username);
    cartOwner = userCreated!;
  });

  beforeEach(() => {
    service = new CartsService();
  });

  describe('getHello - service is defined', () => {
    it('should return "Hello from CartsService!"', () => {
      expect(service.getHello()).toEqual('Hello from CartsService!');
    });
  });

  describe('createCart', () => {
    it('should create a cart for a user', async () => {
      const newCartId = await service.createCart(cartOwner.id);
      if (!newCartId) {
        fail('Cart was not created');
      }
      const cart = await service.getCartById(newCartId);
      expect(cart).toBeTruthy();
      expect(cart?.userId).toEqual(cartOwner.id);
    });
  });

  describe('getCartsForUser', () => {
    it('should return carts for a user', async () => {
      const carts = await service.getCartsForUser(cartOwner.id);
      expect(carts).toBeTruthy();
      expect(carts.length).toBeGreaterThanOrEqual(0);
      expect(carts[0].userId).toEqual(cartOwner.id);
    });

    it('should return empty array if no carts found', async () => {
      const carts = await service.getCartsForUser(-1);
      expect(carts).toBeTruthy();
      expect(carts.length).toEqual(0);
    });
  });

  describe('getCartById', () => {
    it('should return a cart by id', async () => {
      const newCartId = await service.createCart(cartOwner.id);
      if (!newCartId) {
        fail('Cart was not created');
      }
      const cart = await service.getCartById(newCartId);
      expect(cart).toBeTruthy();
      expect(cart?.id).toEqual(newCartId);
    });
  });

  describe('archiveCart', () => {
    it('should archive a cart', async () => {
      const newCartId = await service.createCart(cartOwner.id);
      if (!newCartId) {
        fail('Cart was not created');
      }
      await service.archiveCart(newCartId);
      const cart = await service.getCartById(newCartId);

      // expect cart to be undefined
      expect(cart).toBeUndefined();
    });
  });
});
