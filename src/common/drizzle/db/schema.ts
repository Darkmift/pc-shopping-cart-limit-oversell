import {
  mysqlTable,
  varchar,
  serial,
  timestamp,
  tinyint,
  mysqlEnum,
  int,
  mysqlSchema,
  index,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const users = mysqlTable(
  'users',
  {
    id: serial('id').primaryKey(),
    username: varchar('username', { length: 256 }).unique(),
    password: varchar('password', { length: 255 }),
    lastActive: timestamp('lastActive').defaultNow(),
    archived: tinyint('archived').default(0),
  },
  (users) => {
    return {
      usernameIdx: index('usernameIdx').on(users.username),
    };
  },
);

export const admins = mysqlTable('admins', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 256 }).unique(),
  role: mysqlEnum('role', ['1', '2', '3']).default('1').notNull(),
});

export const products = mysqlTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  amount: int('amount').notNull(),
  price: int('price').notNull(),
  price_percent: int('price_percent').notNull().default(100),
  archived: tinyint('archived').default(0),
});

export const productInventoryItems = mysqlTable('product_inventory_items', {
  id: serial('id').primaryKey(),
  productId: int('productId')
    .notNull()
    .references(() => products.id),
  cartId: int('cartId')
    .notNull()
    .references(() => carts.id),
});

export const carts = mysqlTable('carts', {
  id: serial('id').primaryKey(),
  dateCreated: timestamp('dateCreated').defaultNow(),
  userId: int('userId').references(() => users.id),
  lastActive: timestamp('lastActive').defaultNow().onUpdateNow(),
  isActive: tinyint('isActive').default(1),
  archived: tinyint('archived').default(0),
  pricePaidInActual: int('pricePaidInActual'),
});

export const cartProducts = mysqlTable('cart_products', {
  id: serial('id').primaryKey(),
  cartId: int('cartId').references(() => carts.id),
  productId: int('productId').references(() => products.id),
  pricePaidPerProduct: int('pricePaidPerProduct'),
});

// RELATIONS

// USER <> CARTS
// user to carts (one to many)
export const userToManyCartsRelation = relations(users, ({ many }) => ({
  carts: many(carts),
}));

// carts relation to user (one to one)
export const cartToOneUserRelation = relations(carts, ({ one }) => ({
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
}));

// CART <> CART_PRODUCTS
// cart to cart_products (one to many)
export const cartToManyCartProductsRelation = relations(carts, ({ many }) => ({
  cartProducts: many(cartProducts),
}));

// cart_products to cart (one to one)
export const cartProductsToOneCartRelation = relations(
  cartProducts,
  ({ one }) => ({
    cart: one(carts, {
      fields: [cartProducts.cartId],
      references: [carts.id],
    }),
  }),
);

// PRODUCT <> CART_PRODUCTS
// product to cart_products (one to many)
export const productToManyCartProductsRelation = relations(
  products,
  ({ many }) => ({
    cartProducts: many(cartProducts),
  }),
);

// product_inventory_items to products (one to one)
export const productInventoryItemsToOneProductRelation = relations(
  productInventoryItems,
  ({ one }) => ({
    product: one(products, {
      fields: [productInventoryItems.productId],
      references: [products.id],
    }),
  }),
);

// PRODUCT <> PRODUCT_INVENTORY_ITEMS
// product to product_inventory_items (one to many)
export const productToManyProductInventoryItemsRelation = relations(
  products,
  ({ many }) => ({
    productInventoryItems: many(productInventoryItems),
  }),
);

// product_inventory_items to cart (one to one)
export const productInventoryItemsToOneCartRelation = relations(
  productInventoryItems,
  ({ one }) => ({
    cart: one(carts, {
      fields: [productInventoryItems.cartId],
      references: [carts.id],
    }),
  }),
);
