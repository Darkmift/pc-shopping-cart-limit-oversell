import { verifyToken } from '@/common/utils/jwt.util';
import { ControllerMethod } from '@/types/controller';

export const authMiddleware: ControllerMethod = async (req, res, next) => {
  const token = req.cookies.token;
  const user = await verifyToken(token);
  if (!user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  req.user = user;
  next();
};
