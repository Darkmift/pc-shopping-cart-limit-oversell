import { ControllerMethod } from '@/types/controller';
import AuthService from './auth.service';
import { IUserDTO } from '@/types/user';
import buildStandartResponse from '@/common/utils/prepareResponsePayload';

export const register: ControllerMethod = async (req, res) => {
  const user = req.body as IUserDTO;
  const result = await AuthService.registerUser(user);
  return buildStandartResponse({
    res,
    data: !!result,
    status: result > 0 ? 201 : 400,
  });
};

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
