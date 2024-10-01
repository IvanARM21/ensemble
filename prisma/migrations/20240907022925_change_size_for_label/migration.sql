/*
  Warnings:

  - You are about to drop the column `size` on the `Size` table. All the data in the column will be lost.
  - Added the required column `label` to the `Size` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Size" DROP COLUMN "size",
ADD COLUMN     "label" TEXT NOT NULL;
