/*
  Warnings:

  - You are about to alter the column `logout_date` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[register_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contact_email]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Session` MODIFY `logout_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Profile_register_id_key` ON `Profile`(`register_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Profile_contact_email_key` ON `Profile`(`contact_email`);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `User_cpf_key` ON `User`(`cpf`);
