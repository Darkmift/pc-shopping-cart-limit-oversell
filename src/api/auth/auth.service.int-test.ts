import { IUserDTO } from '@/types/user';
import AuthService from './auth.service';
import UsersService from '../users/users.service';
import logger from '@/utils/logger';

describe('AuthService', () => {
  let user: Pick<IUserDTO, 'password' | 'username'>;

  beforeEach(async () => {
    user = {
      password: '12345',
      username: 'bob',
    };
  });

  afterAll(async () => {
    await UsersService.removeUserByUsername(user.username);
  });

  describe('registerUser', () => {
    it('should register a user', async () => {
      const result = await AuthService.registerUser(user as IUserDTO);
      expect(result).toBe(true);
    });

    it('should not register a user with an existing username', async () => {
      const result = await AuthService.registerUser(user as IUserDTO);
      expect(result).toBe(false);
    });
  });

  describe('loginUser', () => {
    beforeAll(async () => {
      const registeredUser = await UsersService.getUserByUsername(
        user.username,
      );

      logger.info('registeredUser->login test', registeredUser);

      user.username = registeredUser?.username || 'notfound';
    });

    it('should login a user', async () => {
      const result = await AuthService.loginUser(user);
      console.log('🚀 ~ it ~ result:', result);
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      //expect result.user.password to be undefined
      expect(result?.user).not.toHaveProperty('password');
    });

    it('should not login a user with invalid credentials', async () => {
      const result = await AuthService.loginUser({
        ...user,
        password: 'wrongpassword',
      });
      expect(result).toBeUndefined();
    });
  });
});
