    import request from 'supertest';
    import productsRouter from './products.router';
    import app from '@/index';

    app.use('/products', productsRouter);

    describe('ProductsRouter', () => {
      it('GET / - should return "Hello from ProductsService!"', async () => {
        const res = await request(app).get('/products');
        expect(res.text).toEqual('Hello from ProductsService!');
      });
    });
