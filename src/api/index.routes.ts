import { Router } from 'express';
import userRouter from './users/users.routes';
import authRouter from './auth/auth.routes';
import productsRouter from './products/products.router';
import cartsRouter from './carts/carts.router';
import productInventoryRouter from './product-inventory/product-inventory.router';

const apiRouter: Router = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/carts', cartsRouter);
apiRouter.use('/product-inventory', productInventoryRouter);

export default apiRouter;
