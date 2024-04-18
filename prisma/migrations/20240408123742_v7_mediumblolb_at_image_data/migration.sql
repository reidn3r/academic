/*
  Warnings:

  - You are about to alter the column `logout_date` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `ProfileProjectImageData` MODIFY `image_data` MEDIUMBLOB NOT NULL;

-- AlterTable
ALTER TABLE `Session` MODIFY `logout_date` DATETIME NULL;
