import { IUserDTO } from '@/types/user';
import { verifyToken, generateToken } from './jwt.util';

describe('JWT Utils', () => {
  const user: IUserDTO = {
    id: 123,
    username: 'bob',
    password: '12345',
    lastActive: new Date(),
    archived: 0,
  };
  describe('generateToken', () => {
    it('should generate a token', () => {
      const token = generateToken(user);
      expect(token).toBeDefined();
      // expect token to have 3 parts separated by '.'
      expect(token.split('.').length).toBe(3);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const token = generateToken(user);
      const decoded = verifyToken(token);
      expect(decoded).toBeDefined();
      if (!decoded) {
        throw new Error('decoded is undefined');
      }
      expect(decoded.id).toBe(user.id);
      expect(decoded.username).toBe(user.username);
    });

    it('should return null for an invalid token', () => {
      const token = 'invalid.token';
      const decoded = verifyToken(token);
      expect(decoded).toBeNull();
    });
  });
});
