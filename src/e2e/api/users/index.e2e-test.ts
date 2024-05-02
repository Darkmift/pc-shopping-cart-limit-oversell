import request from 'supertest';
import UsersService from '@/api/users/users.service';
import app from '../../../index';
import { IUserDTO } from '@/types/user';

const endpoint = '/api/v1/users';

// describe GET /api/v1/users
describe('GET /api/v1/users', () => {
  // describe GET /api/v1/users - 200 OK
  describe('GET /api/v1/users - 200 OK', () => {
    it('should return 200 OK', (done) => {
      request(app).get(endpoint).expect(200, done);
    });
  });

  describe('GET all users', () => {
    it('should return an response containing users', async () => {
      const response = await request(app)
        .get(endpoint)
        .set('Accept', 'application/json');

      // expect response.body.data to be an array
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe('GET /api/v1/users/:userId/carts', () => {
    var user: IUserDTO;

    beforeAll(async () => {
      await UsersService.createUser({
        username: 'testuser',
        password: 'testpassword',
      });

      
    });

    // it should return carts for user
    it('should return carts for user', async () => {
      const response = await request(app)
        .get(`${endpoint}/1/carts`)
        .set('Accept', 'application/json');

      // expect response.body.data to be an array
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });
});
