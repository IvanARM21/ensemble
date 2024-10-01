/*
  Warnings:

  - Added the required column `type` to the `Size` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "CategoryType" ADD VALUE 'Shoes';

-- AlterTable
ALTER TABLE "Size" ADD COLUMN     "type" "CategoryType" NOT NULL;
