import { Router } from 'express';
import { ProductInventoryController } from './product-inventory.controller';

const productInventoryRouter: Router = Router();
const controller = new ProductInventoryController();

productInventoryRouter.get('/', (req, res) => {
  res.send(controller.getHello());
});

productInventoryRouter.get('/:inventoryProductId', controller.getProductById);
productInventoryRouter.post('/', controller.createMultipleProducts);
productInventoryRouter.delete('/:inventoryProductId', controller.removeProductFromCart);

export default productInventoryRouter;
