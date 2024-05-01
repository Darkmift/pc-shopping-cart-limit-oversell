import { Router } from 'express';
import { register, login } from './auth.controllers';

/**
 * Router for handling authentication which includes registering and logging in users.
 * @module authRouter
 */
const authRouter: Router = Router();

/**
 * Route serving user registration.
 * @name post/register
 * @function
 * @memberof module:authRouter
 * @param {string} path - Express path
 * @param {callback} middleware - Middleware function to handle the request.
 */
authRouter.post('/register', register);

/**
 * Route serving user login.
 * @name post/login
 * @function
 * @memberof module:authRouter
 * @param {string} path - Express path
 * @param {callback} middleware - Middleware function to handle the request.
 */
authRouter.post('/login', login);

export default authRouter;
