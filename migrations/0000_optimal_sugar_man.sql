CREATE TABLE `admins` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(256),
	`role` enum('1','2','3') NOT NULL DEFAULT '1',
	CONSTRAINT `admins_id` PRIMARY KEY(`id`),
	CONSTRAINT `admins_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `cartProducts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cartId` int NOT NULL,
	`productId` int NOT NULL,
	`pricePaidPerProduct` int,
	CONSTRAINT `cartProducts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `carts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`dateCreated` timestamp DEFAULT (now()),
	`userId` int NOT NULL,
	`lastActive` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`isActive` tinyint DEFAULT 1,
	`archived` tinyint DEFAULT 0,
	`pricePaidInActual` int,
	CONSTRAINT `carts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_inventory_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`productId` int NOT NULL,
	`cartId` int NOT NULL,
	CONSTRAINT `product_inventory_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`amount` int NOT NULL,
	`price` int NOT NULL,
	`price_percent` int NOT NULL DEFAULT 100,
	`archived` tinyint DEFAULT 0,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(256),
	`password` varchar(255),
	`lastActive` timestamp DEFAULT (now()),
	`archived` tinyint DEFAULT 0,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE INDEX `usernameIdx` ON `users` (`username`);--> statement-breakpoint
ALTER TABLE `cartProducts` ADD CONSTRAINT `cartProducts_cartId_carts_id_fk` FOREIGN KEY (`cartId`) REFERENCES `carts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cartProducts` ADD CONSTRAINT `cartProducts_productId_products_id_fk` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `carts` ADD CONSTRAINT `carts_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_inventory_items` ADD CONSTRAINT `product_inventory_items_productId_products_id_fk` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_inventory_items` ADD CONSTRAINT `product_inventory_items_cartId_carts_id_fk` FOREIGN KEY (`cartId`) REFERENCES `carts`(`id`) ON DELETE no action ON UPDATE no action;