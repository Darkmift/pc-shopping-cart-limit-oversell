import { Router } from 'express';
import { getUsers } from './users.controllers';

const userRouter: Router = Router();

userRouter.get('/', getUsers);

export default userRouter;
