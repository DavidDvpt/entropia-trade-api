-- CreateTable
CREATE TABLE `item` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `price` INTEGER NOT NULL,
    `img_url` VARCHAR(191) NOT NULL,
    `typeItemId` VARCHAR(191) NOT NULL,
UNIQUE INDEX `item.name_unique`(`name`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_item` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
UNIQUE INDEX `type_item.name_unique`(`name`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `item` ADD FOREIGN KEY (`typeItemId`) REFERENCES `type_item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
