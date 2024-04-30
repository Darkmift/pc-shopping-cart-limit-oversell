    import { ProductsController } from './products.controller';
    import { ProductsService } from './products.service';

    describe('ProductsController', () => {
      let controller: ProductsController;
      let service: ProductsService;

      beforeEach(() => {
        service = new ProductsService();
        controller = new ProductsController(service);
      });

      it('should return "Hello from ProductsService!"', () => {
        expect(controller.getHello()).toEqual('Hello from ProductsService!');
      });
    });
