import jwt from 'jsonwebtoken';
import config from '@/common/config';
import logger from '@/utils/logger';

export const generateToken = (payload: any) => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    logger.error('JWT verify failed', error);
    return null;
  }
};
