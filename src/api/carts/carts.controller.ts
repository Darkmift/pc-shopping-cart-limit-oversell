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

  /**
   * @openapi
   * /carts/{cartId}:
   *   get:
   *     summary: Get a cart
   *     description: This endpoint retrieves a specific cart.
   *     tags: [Carts]
   *     responses:
   *       200:
   *         description: Cart retrieved successfully
   *         content:
   *          application/json:
   *           schema:
   *            $ref: '#/components/schemas/CartDTO'
   */
  public getCartById: ControllerMethod = async (req, res) => {
    const cart = await this.service.getCartById(+req.params.cartId);
    return buildStandartResponse({ res, data: cart, status: 200 });
  };

  /**
   * @openapi
   * /carts:
   *   post:
   *     summary: Create a new cart
   *     description: This endpoint creates a new cart.
   *     tags: [Carts]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               userId:
   *                 type: integer
   *             required:
   *               - userId
   *     responses:
   *       201:
   *         description: Cart created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 cartId:
   *                   type: integer
   *                   format: int64
   *                   description: The ID of the newly created cart
   *       500:
   *         description: Error creating cart
   */
  public createCart: ControllerMethod = async (req, res) => {
    const cartId = await this.service.createCart(+req.body.userId);
    return buildStandartResponse({
      res,
      data: { cartId },
      status: cartId ? 201 : 500,
    });
  };

  /**
   * @openapi
   * /carts/{cartId}:
   *   delete:
   *     summary: Archive a cart
   *     description: This endpoint archives a specific cart.
   *     tags: [Carts]
   *     responses:
   *       204:
   *         description: Cart archived successfully
   *       404:
   *         description: Cart not found
   */
  public archiveCart: ControllerMethod = async (req, res) => {
    await this.service.archiveCart(+req.params.cartId);
    return buildStandartResponse({ res, data: true, status: 204 });
  };

  /**
   * @openapi
   * /carts/:cartId/add-product/:productId:
   *   post:
   *     summary: Add a product to a cart
   *     description: This endpoint adds a product to a specific cart.
   *     tags: [Carts]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               productId:
   *                 type: integer
   *             required:
   *               - productId
   *     responses:
   *       201:
   *         description: Product added to cart successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 productId:
   *                   type: integer
   *                   description: The ID of the product added to the cart
   *       500:
   *         description: Error adding product to cart
   */
  public addProductToCart: ControllerMethod = async (req, res) => {
    const { cartId } = req.params;
    const { amount, productId } = req.body;
    const newInventoryProductId =
      await this.inventoryService.addProductInventoryItemToCart(
        +productId,
        +cartId,
        +amount
      );
    return buildStandartResponse({
      res,
      data: { inventoryProductId: newInventoryProductId },
      status: newInventoryProductId ? 201 : 500,
    });
  };
}
