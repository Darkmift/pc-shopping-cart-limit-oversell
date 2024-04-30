import { ControllerMethod } from '@/types/controller';
import { CartsService } from './carts.service';
import buildStandartResponse from '@/common/utils/prepareResponsePayload';
import { ProductInventoryService } from '../product-inventory/product-inventory.service';

export class CartsController {
  private service: CartsService;
  private inventoryService: ProductInventoryService;

  constructor(service = new CartsService()) {
    this.service = service;
    this.inventoryService = new ProductInventoryService();
  }

  public getHello(): string {
    return this.service.getHello();
  }

  public getCartsForUser: ControllerMethod = async (req, res) => {
    const carts = await this.service.getCartsForUser(+req.params.userId);
    return buildStandartResponse({ res, data: carts, status: 200 });
  };

  public getCartById: ControllerMethod = async (req, res) => {
    const cart = await this.service.getCartById(+req.params.cartId);
    return buildStandartResponse({ res, data: cart, status: 200 });
  };

  public createCart: ControllerMethod = async (req, res) => {
    const cartId = await this.service.createCart(+req.body.userId);
    return buildStandartResponse({
      res,
      data: { cartId },
      status: cartId ? 201 : 500,
    });
  };

  public archiveCart: ControllerMethod = async (req, res) => {
    await this.service.archiveCart(+req.params.cartId);
    return buildStandartResponse({ res, data: true, status: 204 });
  };

  // add product to cart
  public addProductToCart: ControllerMethod = async (req, res) => {
    const { productId, cartId } = req.body;
    const newProduct =
      await this.inventoryService.addProductInventoryItemToCart(
        productId,
        cartId,
      );
    return buildStandartResponse({
      res,
      data: newProduct,
      status: newProduct ? 201 : 500,
    });
  };
}
