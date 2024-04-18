/*
  Warnings:

  - You are about to drop the column `register_id` on the `Profile` table. All the data in the column will be lost.
  - You are about to alter the column `logout_date` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropIndex
DROP INDEX `Profile_register_id_key` ON `Profile`;

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `register_id`;

-- AlterTable
ALTER TABLE `ProfileProjectImageData` MODIFY `image_data` LONGBLOB NOT NULL;

-- AlterTable
ALTER TABLE `Session` MODIFY `logout_date` DATETIME NULL;
