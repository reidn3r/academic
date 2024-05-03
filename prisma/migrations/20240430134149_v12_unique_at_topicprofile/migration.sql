/*
  Warnings:

  - You are about to alter the column `logout_date` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[topicsInterestId,profileId]` on the table `TopicsOfInterestProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Session` MODIFY `logout_date` DATETIME NULL;

-- CreateIndex
CREATE UNIQUE INDEX `TopicsOfInterestProfile_topicsInterestId_profileId_key` ON `TopicsOfInterestProfile`(`topicsInterestId`, `profileId`);
