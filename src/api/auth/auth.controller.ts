import { ControllerMethod } from '@/types/controller';
import AuthService from './auth.service';
import { IUserDTO } from '@/types/user';
import buildStandartResponse from '@/utils/prepareResponsePayload';

// a register controller method
export const register: ControllerMethod = async (req, res) => {
  const user = req.body as IUserDTO;
  const result = await AuthService.registerUser(user);
  return buildStandartResponse({
    res,
    data: result,
    status: result ? 201 : 400,
  });
};

// a login controller method
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
    data: result,
    status: 200,
  });
};
