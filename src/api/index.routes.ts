import { Router } from 'express';
import userRouter from './users/users.routes';

const apiRouter: Router = Router();

apiRouter.use('/users', userRouter);

export default apiRouter;
