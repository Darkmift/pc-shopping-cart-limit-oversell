import request from 'supertest';
import productsRouter from './products.routes';
import app from '@/index';

app.use('/products', productsRouter);

describe('ProductsRouter', () => {
  it('GET / - should return "Hello from ProductsService!"', async () => {
    const res = await request(app).get('/products');
    console.log('🚀 ~ WTGDF ~ res:', res.body.data);
    const data = res.body.data;
    expect(data).toBeDefined();
    expect(data).toBeInstanceOf(Array);
    if (data.length > 0) {
      // expect first item in data to have id, name, price, and amount
      expect(data[0]).toHaveProperty('id');
      expect(data[0]).toHaveProperty('name');
      expect(data[0]).toHaveProperty('price');
      expect(data[0]).toHaveProperty('amount');
    }

    expect(res.status).toEqual(200);
  });
});
