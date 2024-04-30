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

export default cartsRouter;
