-- AlterTable
ALTER TABLE `item` ADD COLUMN     `modifiedAt` DATETIME(3),
    ADD COLUMN     `isActive` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `type_item` ADD COLUMN     `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN     `isActive` BOOLEAN NOT NULL DEFAULT true;
