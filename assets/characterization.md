# Projet description

This project develops a comprehensive e-commerce backend system designed to manage users, carts, and products efficiently. The system is built on a robust architecture that includes a relational database and a server providing RESTful APIs for interaction with client applications.

Key Features
- User Management: The system supports full CRUD operations for users, including registration, updates, and soft deletion (archiving rather than actual deletion). Each user can manage their own carts and has a unique username and password stored securely.
- Cart Functionality: Users can create and manage carts, adding or removing products as needed. Carts track the total price paid and maintain a history of activity with timestamps.
- Product Management: The backend supports comprehensive management of product listings, including adding new products, updating existing listings, and handling inventory through a sub-table that tracks inventory items linked to specific carts.
## Architecture
- Database Schema: Utilizes UUIDs for primary keys to ensure global uniqueness across distributed systems. Tables include users, carts, products, product inventory items, and cart products, with appropriate relations and constraints to maintain data integrity.
- API Endpoints: Offers a range of endpoints for interacting with the database, allowing operations such as retrieving, adding, updating, and archiving records. Each main entity (user, cart, product) has endpoints dedicated to typical CRUD operations.
- Security and Data Integrity: Implements best practices such as password hashing and database constraints like foreign keys and unique indexes to ensure security and consistency of data.
- This backend system is designed to be scalable, secure, and efficient, providing a solid foundation for building a full-featured e-commerce platform.

# Resources

## Users
  <table>
    <thead>
      <tr>
        <th>Method</th>
        <th>Endpoint</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>GET</td>
        <td>/users</td>
        <td>Retrieve a list of all users</td>
      </tr>
      <tr>
        <td>GET</td>
        <td>/users/:uid</td>
        <td>Retrieve a specific user by ID</td>
      </tr>
      <tr>
        <td>GET</td>
        <td>/users/:uid/carts</td>
        <td>Retrieve all carts associated with a specific user</td>
      </tr>
      <tr>
        <td>POST</td>
        <td>/users</td>
        <td>Create a new user</td>
      </tr>
      <tr>
        <td>PUT</td>
        <td>/users/:uid</td>
        <td>Update an existing user by ID</td>
      </tr>
      <tr>
        <td>DELETE</td>
        <td>/users/:uid</td>
        <td>Soft delete a user by ID</td>
      </tr>
    </tbody>
  </table>

## Carts
  <table>
    <thead>
      <tr>
        <th>Method</th>
        <th>Endpoint</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>GET</td>
        <td>/carts</td>
        <td>Retrieve a list of all carts</td>
      </tr>
      <tr>
        <td>GET</td>
        <td>/carts/:cid</td>
        <td>Retrieve a specific cart by ID</td>
      </tr>
      <tr>
        <td>GET</td>
        <td>/carts/:cid/items</td>
        <td>Retrieve all items in a specific cart</td>
      </tr>
      <tr>
        <td>POST</td>
        <td>/carts</td>
        <td>Create a new cart</td>
      </tr>
      <tr>
        <td>PUT</td>
        <td>/carts/:cid</td>
        <td>Update a specific cart by ID</td>
      </tr>
      <tr>
        <td>DELETE</td>
        <td>/carts/:cid</td>
        <td>Delete a specific cart by ID</td>
      </tr>
    </tbody>
  </table>

## Cart Items
  <table>
    <thead>
      <tr>
        <th>Method</th>
        <th>Endpoint</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>GET</td>
        <td>/carts/:cid/items</td>
        <td>Retrieve all items in a specific cart</td>
      </tr>
      <tr>
        <td>POST</td>
        <td>/carts/:cid/items</td>
        <td>Add a new item to a cart (specify in body)</td>
      </tr>
      <tr>
        <td>PUT</td>
        <td>/carts/:cid/items/:itemId</td>
        <td>Update an item in a cart (e.g., change quantity)</td>
      </tr>
      <tr>
        <td>DELETE</td>
        <td>/carts/:cid/items/:itemId</td>
        <td>Remove an item from a cart</td>
      </tr>
    </tbody>
  </table>

## Products
  <table>
    <thead>
      <tr>
        <th>Method</th>
        <th>Endpoint</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>GET</td>
        <td>/products</td>
        <td>Retrieve a list of all products</td>
      </tr>
      <tr>
        <td>GET</td>
        <td>/products/:pid</td>
        <td>Retrieve a specific product by ID</td>
      </tr>
      <tr>
        <td>POST</td>
        <td>/products</td>
        <td>Create a new product</td>
      </tr>
      <tr>
        <td>PUT</td>
        <td>/products/:pid</td>
        <td>Update a specific product by ID</td>
      </tr>
      <tr>
        <td>DELETE</td>
        <td>/products/:pid</td>
        <td>Delete a specific product by ID</td>
      </tr>
    </tbody>
  </table>

# Structure

## Typescript interfaces
```ts
enum Role {
    SUPER = 1,
    ELEVATED = 2,
    STANDARD = 3
}

interface User {
    id: string;
    username: string; // Unique username
    name: string;
    lastActive: Date;
    password: string; // Stores hashed password
    carts: Cart[];
}

interface Admin {
    id: string;
    username: string; // Unique username
    role: Role;
}

interface Product {
    id: string;
    name: string;
    amount: number;
    price: number;
    pricePercent: number;
    inventoryItems?: ProductInventoryItem[];
}

interface ProductInventoryItem {
    id: string;
    productId: string;
    cartId: string | null;
}

interface CartProduct {
    productId: string;
    quantity: number;
    pricePaidPerProduct: number;
}

interface Cart {
    id: string;
    dateCreated: Date;
    userId: string;
    lastActive: Date;
    isActive: boolean;
    archived: boolean;
    pricePaidInActual: number | null;
    products: CartProduct[];
}
```

## SQL
![Diagram](PC_shop.svg)
```sql
-- Users Table
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    lastActive TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    password VARCHAR(255) NOT NULL,
    archived TINYINT(1) NOT NULL DEFAULT 0
);

-- Admins Table
CREATE TABLE admins (
    id CHAR(36) PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    role TINYINT NOT NULL CHECK (role IN (1, 2, 3))
);

-- Products Table
CREATE TABLE products (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    pricePercent INT NOT NULL DEFAULT 100,
    archived TINYINT(1) NOT NULL DEFAULT 0
);

-- Product Inventory Items Table
CREATE TABLE product_inventory_items (
    id CHAR(36) PRIMARY KEY,
    productId CHAR(36) NOT NULL,
    cartId CHAR(36),   -- Nullable
    FOREIGN KEY (productId) REFERENCES products(id),
    FOREIGN KEY (cartId) REFERENCES carts(id)
);

-- Carts Table
CREATE TABLE carts (
    id CHAR(36) PRIMARY KEY,
    dateCreated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    userId CHAR(36) NOT NULL,
    lastActive TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isActive TINYINT(1) NOT NULL,
    archived TINYINT(1) NOT NULL DEFAULT 0,
    pricePaidInActual DECIMAL(10, 2),
    FOREIGN KEY (userId) REFERENCES users(id)
);
-- Cart Products Table
CREATE TABLE cart_products (
    cartId CHAR(36) NOT NULL,
    productId CHAR(36) NOT NULL,
    quantity INT NOT NULL,
    pricePaidPerProduct DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (cartId, productId),
    FOREIGN KEY (cartId) REFERENCES carts(id),
    FOREIGN KEY (productId) REFERENCES products(id)
);
```