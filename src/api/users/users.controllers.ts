import { ControllerMethod } from '@/types/controller';
import UsersService from './users.service';
import { CartsService } from '@/api/carts/carts.service';
import { IUserDTO } from '@/types/user';
import buildStandartResponse from '@/common/utils/prepareResponsePayload';


/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     description: This endpoint retrieves all users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserDTO'
 */
export const getUsers: ControllerMethod<Promise<IUserDTO>> = async (_, res) => {
  const users = await UsersService.getUsers();
  return buildStandartResponse({ res, data: users, status: 200 }); // This returns Promise<IUserDTO[]>
};

/**
 * @openapi
 * /users/{userId}/carts:
 *   get:
 *     summary: Get carts for a user
 *     description: This endpoint retrieves all carts for a specific user.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Carts retrieved successfully
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/CartDTO'
 *       404:
 *         description: User not found
 */
export const getCartsForUser: ControllerMethod = async (req, res) => {
  const cartsService = new CartsService();
  const carts = await cartsService.getCartsForUser(+req.params.userId);
  return buildStandartResponse({ res, data: carts, status: 200 });
};
