/*
  Warnings:

  - You are about to drop the column `discount` on the `Variant` table. All the data in the column will be lost.
  - Added the required column `name` to the `Variant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "discount",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;
