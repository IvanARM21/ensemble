/*
  Warnings:

  - You are about to drop the column `discount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `Variant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "discount";

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "label";

-- CreateTable
CREATE TABLE "ImagesVariant" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "variantId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ImagesVariant_id_key" ON "ImagesVariant"("id");

-- AddForeignKey
ALTER TABLE "ImagesVariant" ADD CONSTRAINT "ImagesVariant_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
