import { ControllerMethod } from '@/types/controller';
import { ProductInventoryService } from './product-inventory.service';
import buildStandartResponse from '@/common/utils/prepareResponsePayload';

export class ProductInventoryController {
  private service: ProductInventoryService;

  constructor(service = new ProductInventoryService()) {
    this.service = service;
  }

  public getHello(): string {
    return this.service.getHello();
  }

  // get by id
  public getProductById: ControllerMethod = async (req, res) => {
    const product = await this.service.getInventoryProductById(
      +req.params.inventoryProductId,
    );
    return buildStandartResponse({ res, data: product, status: 200 });
  };

  // create product
  public createInventoryProduct: ControllerMethod = async (req, res) => {
    const newProductId = await this.service.createInventoryProduct(req.body);
    return buildStandartResponse({
      res,
      data: { productId: newProductId },
      status: newProductId ? 201 : 500,
    });
  };

  // create multiple products
  public createMultipleProducts: ControllerMethod = async (req, res) => {
    const { productId, amount } = req.body;
    const newProducts = await this.service.createMultipleInventoryProducts(
      productId,
      amount,
    );
    return buildStandartResponse({
      res,
      data: newProducts,
      status: newProducts ? 201 : 500,
    });
  };

  // add product to cart
  public addProductToCart: ControllerMethod = async (req, res) => {
    const { productId, cartId } = req.body;
    const newProduct = await this.service.addProductInventoryItemToCart(
      productId,
      cartId,
    );
    return buildStandartResponse({
      res,
      data: newProduct,
      status: newProduct ? 201 : 500,
    });
  };

  // remove product from cart
  public removeProductFromCart: ControllerMethod = async (req, res) => {
    const { inventoryProductId } = req.body;
    const removedProduct = await this.service.removeProductFromCart(
      inventoryProductId,
    );
    return buildStandartResponse({
      res,
      data: removedProduct,
      status: removedProduct ? 200 : 500,
    });
  };
}
