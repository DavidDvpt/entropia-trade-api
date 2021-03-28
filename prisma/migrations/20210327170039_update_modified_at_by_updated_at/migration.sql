/*
  Warnings:

  - You are about to drop the column `modifiedAt` on the `item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `item` DROP COLUMN `modifiedAt`,
    ADD COLUMN     `updatedAt` DATETIME(3);

-- AlterTable
ALTER TABLE `type_item` ADD COLUMN     `updatedAt` DATETIME(3);
