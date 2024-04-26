ALTER TABLE `admins` MODIFY COLUMN `role` enum('1','2','3') NOT NULL DEFAULT '1';--> statement-breakpoint
ALTER TABLE `carts` MODIFY COLUMN `userId` int;--> statement-breakpoint
ALTER TABLE `carts` MODIFY COLUMN `isActive` tinyint DEFAULT 1;--> statement-breakpoint
ALTER TABLE `product_inventory_items` MODIFY COLUMN `productId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `product_inventory_items` MODIFY COLUMN `cartId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `amount` int NOT NULL;--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `price` int NOT NULL;--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `price_percent` int NOT NULL DEFAULT 100;--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `archived` tinyint DEFAULT 0;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `archived` tinyint DEFAULT 0;--> statement-breakpoint
CREATE INDEX `usernameIdx` ON `users` (`username`);--> statement-breakpoint
ALTER TABLE `cart_products` ADD CONSTRAINT `cart_products_cartId_carts_id_fk` FOREIGN KEY (`cartId`) REFERENCES `carts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cart_products` ADD CONSTRAINT `cart_products_productId_products_id_fk` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `carts` ADD CONSTRAINT `carts_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_inventory_items` ADD CONSTRAINT `product_inventory_items_productId_products_id_fk` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_inventory_items` ADD CONSTRAINT `product_inventory_items_cartId_carts_id_fk` FOREIGN KEY (`cartId`) REFERENCES `carts`(`id`) ON DELETE no action ON UPDATE no action;