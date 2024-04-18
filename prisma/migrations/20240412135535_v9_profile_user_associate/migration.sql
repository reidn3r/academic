/*
  Warnings:

  - You are about to drop the column `contact_email` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Profile` table. All the data in the column will be lost.
  - You are about to alter the column `logout_date` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `city_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `state_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `university_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `university` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_registerId_fkey`;

-- DropIndex
DROP INDEX `Profile_contact_email_key` ON `Profile`;

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `contact_email`,
    DROP COLUMN `name`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `registerId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Session` MODIFY `logout_date` DATETIME NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `city_id`,
    DROP COLUMN `state_id`,
    DROP COLUMN `university_id`,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL,
    ADD COLUMN `university` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Profile_userId_key` ON `Profile`(`userId`);

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_registerId_fkey` FOREIGN KEY (`registerId`) REFERENCES `Register`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
