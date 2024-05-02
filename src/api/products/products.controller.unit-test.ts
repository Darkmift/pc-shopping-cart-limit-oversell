import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(() => {
    service = new ProductsService();
    controller = new ProductsController(service);
  });

  it('stub', () => {
    expect(true).toBe(true);
  });
});
