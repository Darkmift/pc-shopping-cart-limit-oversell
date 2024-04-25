import { IUserDTO } from '@/types/user';

export default class UsersService {
  static async getUsers(): Promise<IUserDTO[]> {
    return [
      {
        id: '1',
        name: 'John Doe',
        email: '',
        password: '',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
}
