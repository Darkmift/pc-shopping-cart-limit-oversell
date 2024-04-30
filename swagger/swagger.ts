import swaggerJsdoc from 'swagger-jsdoc';
import swaggerJson from './swagger.json';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
  },
  apis: [
    'src/api/auth/auth.controller.ts',
    'src/api/users/users.routes.ts',
    'src/api/carts/carts.routes.ts',
    'src/api/products/products.routes.ts',
    'src/api/product-inventory/product-inventory.routes.ts',
  ],
};

const specs = swaggerJsdoc(options);

export default specs;
