import {
  mysqlTable,
  varchar,
  timestamp,
  tinyint,
  mysqlEnum,
  int,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

// Users Table
export const users = mysqlTable(
  'users',
  {
    id: int('id').primaryKey().autoincrement(),
    username: varchar('username', { length: 256 }).unique(),
    password: varchar('password', { length: 255 }),
    lastActive: timestamp('lastActive').defaultNow(),
    archived: tinyint('archived').default(0),
  }
);

// Admins Table
export const admins = mysqlTable(
  'admins',
  {
    id: int('id').primaryKey().autoincrement(),
    username: varchar('username', { length: 256 }).unique(),
    role: mysqlEnum('role', ['1', '2', '3']).default('1').notNull(),
  }
);

// Products Table
export const products = mysqlTable(
  'products',
  {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    amount: int('amount').notNull(),
    price: int('price').notNull(),
    archived: tinyint('archived').default(0),
  }
);

// Carts Table
export const carts = mysqlTable(
  'carts',
  {
    id: int('id').primaryKey().autoincrement(),
    dateCreated: timestamp('dateCreated').defaultNow(),
    userId: int('userId')
      .notNull()
      .references(() => users.id),
    lastActive: timestamp('lastActive').defaultNow().onUpdateNow(),
    isActive: tinyint('isActive').default(1),
    archived: tinyint('archived').default(0),
  }
);

// Products Inventory Table
export const productsInventory = mysqlTable(
  'products_inventory',
  {
    productId: int('productId')
      .notNull()
      .references(() => products.id),
    cartId: int('cartId')
      .notNull()
      .references(() => carts.id),
  }
);

// RELATIONS

// Users to Carts (One to Many)
export const userToManyCartsRelation = relations(users, ({ many }) => ({
  carts: many(carts),
}));

// Carts to User (One to One)
export const cartToOneUserRelation = relations(carts, ({ one }) => ({
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
}));
