import { verifyToken, generateToken } from './jwt.util';

describe('JWT Utils', () => {
  const user = { id: 1, username: 'test' };
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
