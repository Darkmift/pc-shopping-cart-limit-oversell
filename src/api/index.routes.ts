import { Router } from 'express';
import userRouter from './users/users.routes';
import authRouter from './auth/auth.routes';

const apiRouter: Router = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);

export default apiRouter;
