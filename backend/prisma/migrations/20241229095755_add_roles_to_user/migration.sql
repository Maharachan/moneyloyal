-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` ENUM('ADMIN', 'CASHIER', 'USER') NOT NULL DEFAULT 'USER';
