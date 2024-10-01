/*
  Warnings:

  - You are about to drop the column `color` on the `Color` table. All the data in the column will be lost.
  - Added the required column `label` to the `Color` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Color" DROP COLUMN "color",
ADD COLUMN     "label" TEXT NOT NULL;
