    import request from 'supertest';
    import productInventoryRouter from './product-inventory.routes';
    import app from '@/index';

    app.use('/product-inventory', productInventoryRouter);

    describe('ProductInventoryRouter', () => {
      it('GET / - should return "Hello from ProductInventoryService!"', async () => {
        const res = await request(app).get('/product-inventory');
        expect(res.text).toEqual('Hello from ProductInventoryService!');
      });
    });
