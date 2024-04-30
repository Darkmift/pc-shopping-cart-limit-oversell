import { Router } from 'express';
import userRouter from './users/users.routes';
import authRouter from './auth/auth.routes';
import productsRouter from './products/products.routes';
import cartsRouter from './carts/carts.routes';
import productInventoryRouter from './product-inventory/product-inventory.routes';

const apiRouter: Router = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/carts', cartsRouter);
apiRouter.use('/product-inventory', productInventoryRouter);

export default apiRouter;
