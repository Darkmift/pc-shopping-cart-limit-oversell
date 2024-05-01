import { Router } from 'express';
import { CartsController } from './carts.controller';

const cartsRouter: Router = Router();
const controller = new CartsController();

cartsRouter.get('/', (req, res) => {
  res.send(controller.getHello());
});

cartsRouter.get('/:cartId', controller.getCartById);
cartsRouter.post('/', controller.createCart);
cartsRouter.delete('/:cartId', controller.archiveCart);
cartsRouter.post(
  '/:cartId/add-product',
  controller.addProductToCart,
);

export default cartsRouter;
