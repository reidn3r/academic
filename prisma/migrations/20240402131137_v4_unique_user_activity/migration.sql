/*
  Warnings:

  - You are about to alter the column `logout_date` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[user_activity]` on the table `UserActivity` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Session` MODIFY `logout_date` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserActivity_user_activity_key` ON `UserActivity`(`user_activity`);
