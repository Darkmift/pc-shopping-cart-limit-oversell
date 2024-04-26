CREATE TABLE `admins` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(256),
	`role` enum('1','2','3'),
	CONSTRAINT `admins_id` PRIMARY KEY(`id`),
	CONSTRAINT `admins_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `cart_products` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`cartId` int,
	`productId` int,
	`pricePaidPerProduct` int,
	CONSTRAINT `cart_products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `carts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`dateCreated` timestamp DEFAULT (now()),
	`userId` serial AUTO_INCREMENT,
	`lastActive` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`isActive` tinyint,
	`archived` tinyint DEFAULT 0,
	`pricePaidInActual` int,
	CONSTRAINT `carts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_inventory_items` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`productId` int,
	`cartId` int,
	CONSTRAINT `product_inventory_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`amount` int,
	`price` int,
	`price_percent` int,
	`archived` tinyint,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(256),
	`password` varchar(255),
	`lastActive` timestamp DEFAULT (now()),
	`archived` tinyint,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
