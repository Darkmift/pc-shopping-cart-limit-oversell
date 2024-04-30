import { Router } from 'express';
import { getCartsForUser, getUsers } from './users.controllers';

const userRouter: Router = Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId/carts', getCartsForUser);

export default userRouter;
