/*
  Warnings:

  - You are about to alter the column `logout_date` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Session` MODIFY `logout_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `email` VARCHAR(191) NOT NULL;
