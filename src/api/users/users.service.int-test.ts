import { IUserDTO } from '@/types/user';
import UsersService from './users.service';

describe('UsersService', () => {
  const user: Partial<IUserDTO> = {
    username: 'test',
    password: 'test',
  };

  afterAll(async () => {
    await UsersService.removeUserByUsername(user.username!);
  });

  it('should create a user', async () => {
    const result = await UsersService.createUser(user as IUserDTO);
    expect(result).toBeGreaterThan(0);
  });

  it('should get all users', async () => {
    const users = await UsersService.getUsers();
    expect(users[0].username).toBeDefined();
  });

  it('should get user by username', async () => {
    const foundUser = await UsersService.getUserByUsername(user.username!);
    expect(foundUser?.username).toBe(user.username);
  });

  it('should get user by id', async () => {
    const foundUser = await UsersService.getUserByUsername(user.username!);
    if (!foundUser) {
      throw new Error('User not found');
    }
    const foundUserById = await UsersService.getUserById(foundUser.id);
    expect(foundUserById?.id).toEqual(foundUser.id);
  });
});
