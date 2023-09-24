CREATE TABLE `whitelist` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `whitelist_username_unique` ON `whitelist` (`username`);