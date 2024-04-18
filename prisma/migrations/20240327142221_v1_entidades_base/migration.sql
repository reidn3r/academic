-- CreateTable
CREATE TABLE `ContactType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GraduateInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grade` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LinkType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `register_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `contact_email` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `registerId` INTEGER NOT NULL,

    UNIQUE INDEX `Profile_registerId_key`(`registerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfileContacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contact_content` VARCHAR(191) NOT NULL,
    `profileId` INTEGER NOT NULL,
    `contactTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PosGradeInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pos_grade` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfileImageInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image_data` VARCHAR(191) NOT NULL,
    `image_content_type` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `profileId` INTEGER NOT NULL,

    UNIQUE INDEX `ProfileImageInfo_profileId_key`(`profileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfileLinks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `linkTypeId` INTEGER NOT NULL,
    `profileId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfileProjectData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_description` VARCHAR(191) NOT NULL,
    `profileId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfileProjectImageData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image_data` VARCHAR(191) NOT NULL,
    `image_content_type` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `profileProjectDataId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfileTopicsInterest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `topic_id` INTEGER NOT NULL,
    `profile_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RegisterType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Register` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `registerTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `login_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `logout_date` DATETIME NOT NULL,
    `profileId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TopicsInterest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `topic` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TopicsOfInterestProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `topicsInterestId` INTEGER NOT NULL,
    `profileId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserActivity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_activity` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserGrade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_grade_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `profile_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPosGrade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profile_id` INTEGER NOT NULL,
    `posGradeInfoId` INTEGER NOT NULL,
    `profileId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `university_id` INTEGER NOT NULL,
    `city_id` INTEGER NOT NULL,
    `state_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `user_sex` VARCHAR(191) NOT NULL,
    `user_course` VARCHAR(191) NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userActivityId` INTEGER NOT NULL,
    `registerId` INTEGER NOT NULL,

    UNIQUE INDEX `User_registerId_key`(`registerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_registerId_fkey` FOREIGN KEY (`registerId`) REFERENCES `Register`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileContacts` ADD CONSTRAINT `ProfileContacts_contactTypeId_fkey` FOREIGN KEY (`contactTypeId`) REFERENCES `ContactType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileContacts` ADD CONSTRAINT `ProfileContacts_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileImageInfo` ADD CONSTRAINT `ProfileImageInfo_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileLinks` ADD CONSTRAINT `ProfileLinks_linkTypeId_fkey` FOREIGN KEY (`linkTypeId`) REFERENCES `LinkType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileLinks` ADD CONSTRAINT `ProfileLinks_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileProjectData` ADD CONSTRAINT `ProfileProjectData_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileProjectImageData` ADD CONSTRAINT `ProfileProjectImageData_profileProjectDataId_fkey` FOREIGN KEY (`profileProjectDataId`) REFERENCES `ProfileProjectData`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Register` ADD CONSTRAINT `Register_registerTypeId_fkey` FOREIGN KEY (`registerTypeId`) REFERENCES `RegisterType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TopicsOfInterestProfile` ADD CONSTRAINT `TopicsOfInterestProfile_topicsInterestId_fkey` FOREIGN KEY (`topicsInterestId`) REFERENCES `TopicsInterest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TopicsOfInterestProfile` ADD CONSTRAINT `TopicsOfInterestProfile_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPosGrade` ADD CONSTRAINT `UserPosGrade_posGradeInfoId_fkey` FOREIGN KEY (`posGradeInfoId`) REFERENCES `PosGradeInfo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPosGrade` ADD CONSTRAINT `UserPosGrade_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userActivityId_fkey` FOREIGN KEY (`userActivityId`) REFERENCES `UserActivity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_registerId_fkey` FOREIGN KEY (`registerId`) REFERENCES `Register`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
