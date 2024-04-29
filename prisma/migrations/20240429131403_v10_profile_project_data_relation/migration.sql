/*
  Warnings:

  - You are about to alter the column `logout_date` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ProfileProjectImageData` DROP FOREIGN KEY `ProfileProjectImageData_profileProjectDataId_fkey`;

-- AlterTable
ALTER TABLE `Session` MODIFY `logout_date` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileProjectImageData` ADD CONSTRAINT `ProfileProjectImageData_profileProjectDataId_fkey` FOREIGN KEY (`profileProjectDataId`) REFERENCES `ProfileProjectData`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
