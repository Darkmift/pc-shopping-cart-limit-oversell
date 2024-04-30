    import { ProductInventoryController } from './product-inventory.controller';
    import { ProductInventoryService } from './product-inventory.service';

    describe('ProductInventoryController', () => {
      let controller: ProductInventoryController;
      let service: ProductInventoryService;

      beforeEach(() => {
        service = new ProductInventoryService();
        controller = new ProductInventoryController(service);
      });

      it('should return "Hello from ProductInventoryService!"', () => {
        expect(controller.getHello()).toEqual('Hello from ProductInventoryService!');
      });
    });
