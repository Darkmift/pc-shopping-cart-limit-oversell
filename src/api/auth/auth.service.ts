import { IUserDTO } from '@/types/user';
import UserService from '@/api/users/users.service';
import logger from '@/utils/logger';
import { hashPassword, comparePassword } from '@/common/utils/bcrypt.util';
import { generateToken } from '@/common/utils/jwt.util';

//custom error usernotfound
class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
    this.name = 'UserNotFoundError';
  }
}

//custom error invalidCredentials
class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials');
    this.name = 'InvalidCredentialsError';
  }
}

class AuthService {
  // need this because TS behaviour
  private static removePassowrdFromUser(
    user: IUserDTO,
  ): Omit<IUserDTO, 'password'> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async registerUser(user: IUserDTO): Promise<boolean> {
    try {
      user.password = await hashPassword(user.password);
      const newUser = await UserService.createUser(user);
      return !!newUser;
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  static async loginUser(
    user: Pick<IUserDTO, 'username' | 'password'>,
  ): Promise<{ user: Omit<IUserDTO, 'password'>; token: string } | undefined> {
    try {
      const foundUser = await UserService.getUserByUsername(user.username);

      if (!foundUser) {
        throw new UserNotFoundError();
      }

      const isPasswordValid = await comparePassword(
        user.password,
        foundUser?.password,
      );
      if (!isPasswordValid) {
        throw new InvalidCredentialsError();
      }

      const userWithoutPassword = this.removePassowrdFromUser(foundUser);
      const token = generateToken(userWithoutPassword);
      return {
        user: userWithoutPassword,
        token,
      };
    } catch (error) {
      logger.error(error);
    }
  }
}

export default AuthService;
