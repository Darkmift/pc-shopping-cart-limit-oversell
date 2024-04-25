import request from 'supertest';
import app from '../../../index';

const endpoint = '/api/v1/users';

// describe GET /api/v1/users
describe('GET /api/v1/users', () => {
  it('should return 200 OK', (done) => {
    request(app).get(endpoint).expect(200, done);
  });

  it('should return an response containing users', async () => {
    const response = await request(app)
    .get(endpoint)
    .set('Accept', 'application/json');
    console.log("🚀 ~ it ~ response:", response.body)

    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          role: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ]),
    );
  });
});
