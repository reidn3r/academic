/*
  Warnings:

  - You are about to alter the column `logout_date` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `ProfileTopicsInterest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TopicsOfInterestProfile` DROP FOREIGN KEY `TopicsOfInterestProfile_profileId_fkey`;

-- AlterTable
ALTER TABLE `Session` MODIFY `logout_date` DATETIME NULL;

-- AlterTable
ALTER TABLE `TopicsOfInterestProfile` MODIFY `profileId` INTEGER NULL;

-- DropTable
DROP TABLE `ProfileTopicsInterest`;

-- AddForeignKey
ALTER TABLE `TopicsOfInterestProfile` ADD CONSTRAINT `TopicsOfInterestProfile_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
