import { ControllerMethod } from '@/types/controller';
import AuthService from './auth.service';
import { IUserDTO } from '@/types/user';
import buildStandartResponse from '@/common/utils/prepareResponsePayload';

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint registers a new user.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreateDTO'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Error registering user
 */
export const register: ControllerMethod = async (req, res) => {
  const user = req.body as IUserDTO;
  const result = await AuthService.registerUser(user);
  return buildStandartResponse({
    res,
    data: !!result,
    status: result > 0 ? 201 : 400,
  });
};

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     description: This endpoint logs in a user.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 *         headers:
 *          Set-Cookie:
 *           schema:
 *            type: string
 *            example: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.4S6J3
 *       401:
 *         description: Invalid username/password
 */
export const login: ControllerMethod = async (req, res) => {
  const user = req.body as Pick<IUserDTO, 'username' | 'password'>;
  const result = await AuthService.loginUser(user);

  if (!result) {
    return buildStandartResponse({ res, data: null, status: 401 });
  }

  res.cookie('token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
  });

  return buildStandartResponse({
    res,
    data: result.user,
    status: 200,
  });
};
