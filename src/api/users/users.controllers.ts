import { ControllerMethod } from '@/types/controller';
import UsersService from './users.service';
import { IUserDTO } from '@/types/user';
import buildStandartResponse from '@/utils/prepareResponsePayload';

// Here, ensure the type matches the expected array of IUserDTO
export const getUsers: ControllerMethod<Promise<IUserDTO>> = async (_, res) => {
  const users = await UsersService.getUsers();
  return buildStandartResponse({ res, data: users, status: 200 }); // This returns Promise<IUserDTO[]>
};
