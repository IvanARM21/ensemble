/*
  Warnings:

  - Added the required column `order` to the `Size` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Size" ADD COLUMN     "order" INTEGER NOT NULL;