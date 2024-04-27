import { hashPassword, comparePassword } from './bcrypt.util';

describe('bcrypt.util', () => {
  describe('hashPassword', () => {
    it('should hash password', async () => {
      const password = 'password';
      const hash = await hashPassword(password);
      expect(hash).toBeDefined();
    });
  });

  describe('comparePassword', () => {
    it('should return true if password is correct', async () => {
      const password = 'password';
      const hash = await hashPassword(password);
      const isMatch = await comparePassword(password, hash);
      expect(isMatch).toBe(true);
    });

    it('should return false if password is incorrect', async () => {
      const password = 'password';
      const hash = await hashPassword(password);
      const isMatch = await comparePassword('wrongpassword', hash);
      expect(isMatch).toBe(false);
    });
  });
});
