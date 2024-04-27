import request from 'supertest';
import app from '../../../index';
import UsersService from '@/api/users/users.service';

const endpoint = '/api/v1/auth';

describe('POST /api/v1/auth', () => {
  const user = {
    username: 'bob',
    password: '12345',
  };

  afterAll(async () => {
    await UsersService.removeUserByUsername(user.username);
  });

  describe('POST /api/v1/auth/register', () => {
    it('should return 201 Created', async () => {
      const response = await request(app)
        .post(`${endpoint}/register`)
        .send({
          username: 'bob',
          password: '12345',
        })
        .set('Accept', 'application/json');
      expect(response.status).toBe(201);
    });

    it('should return 400 Bad Request', async () => {
      const response = await request(app)
        .post(`${endpoint}/register`)
        .send({
          username: 'bob',
          password: '12345',
        })
        .set('Accept', 'application/json');
      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should return 200 OK', async () => {
      const response = await request(app)
        .post(`${endpoint}/login`)
        .send({
          username: 'bob',
          password: '12345',
        })
        .set('Accept', 'application/json');
      expect(response.status).toBe(200);
      // expect res to have a cookie named token
      expect(response.header['set-cookie'][0]).toMatch(/token=.+/);
    });

    it('should return 401 Unauthorized', async () => {
      const response = await request(app)
        .post(`${endpoint}/login`)
        .send({
          username: 'bob',
          password: 'wrong-password',
        })
        .set('Accept', 'application/json');
      expect(response.status).toBe(401);
    });
  });
});
