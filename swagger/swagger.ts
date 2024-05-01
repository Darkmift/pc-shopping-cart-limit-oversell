import swaggerJsdoc from 'swagger-jsdoc';
import UserCreate from './schemas/UserCreate';
import User from './schemas/User';
import Cart from './schemas/Cart';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
    components: {
      schemas: {
        UserCreateDTO: UserCreate,
        UserDTO: User,
        CartDTO: Cart
      },
    },
  },
  apis: [
    `src/api/**/*.controllers.ts`,
    'src/api/**/*.controller.ts',
    // 'src/api/carts/carts.routes.ts',
    // 'src/api/products/products.routes.ts',
    // 'src/api/product-inventory/product-inventory.routes.ts',
  ],
};

const specs = swaggerJsdoc(options);

export default specs;
