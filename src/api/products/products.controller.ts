import buildStandartResponse from '@/common/utils/prepareResponsePayload';
import { ProductsService } from './products.service';
import { ControllerMethod } from '@/types/controller';

export class ProductsController {
  private service: ProductsService;

  constructor(service = new ProductsService()) {
    this.service = service;
  }

  // a controller method to get all products
  public getProducts: ControllerMethod = async (req, res) => {
    const products = await this.service.getProducts();
    return buildStandartResponse({ res, data: products, status: 200 });
  };

  // a controller method to get a product by id
  public getProductById: ControllerMethod = async (req, res) => {
    const product = await this.service.getProductById(+req.params.productId);
    return buildStandartResponse({ res, data: product, status: 200 });
  };

  // a controller method to create a product
  public createProduct: ControllerMethod = async (req, res) => {
    const newProductId = await this.service.createProduct(req.body);
    return buildStandartResponse({
      res,
      data: { productId: newProductId },
      status: newProductId ? 201 : 500,
    });
  };
}
