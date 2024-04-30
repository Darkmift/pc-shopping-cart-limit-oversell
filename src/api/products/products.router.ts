import { Router } from 'express';
import { ProductsController } from './products.controller';

const productsRouter: Router = Router();
const controller = new ProductsController();

productsRouter.get('/', controller.getProducts);
productsRouter.get('/:productId', controller.getProductById);
productsRouter.post('/', controller.createProduct);

export default productsRouter;
