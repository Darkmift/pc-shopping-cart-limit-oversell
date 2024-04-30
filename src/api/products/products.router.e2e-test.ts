import request from 'supertest';
import productsRouter from './products.routes';
import app from '@/index';

app.use('/products', productsRouter);

describe('ProductsRouter', () => {
  it('GET / - should return "Hello from ProductsService!"', async () => {
    const res = await request(app).get('/products');
    // expect array
    expect(res.body.data).toEqual([]);
    expect(res.status).toEqual(200);
  });
});
