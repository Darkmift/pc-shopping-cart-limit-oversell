    import request from 'supertest';
    import cartsRouter from './carts.routes';
    import app from '@/index';

    app.use('/carts', cartsRouter);

    describe('CartsRouter', () => {
      it('GET / - should return "Hello from CartsService!"', async () => {
        const res = await request(app).get('/carts');
        expect(res.text).toEqual('Hello from CartsService!');
      });
    });
