    import { CartsController } from './carts.controller';
    import { CartsService } from './carts.service';

    describe('CartsController', () => {
      let controller: CartsController;
      let service: CartsService;

      beforeEach(() => {
        service = new CartsService();
        controller = new CartsController(service);
      });

      it('should return "Hello from CartsService!"', () => {
        expect(controller.getHello()).toEqual('Hello from CartsService!');
      });
    });
