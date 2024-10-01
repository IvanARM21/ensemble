/*
  Warnings:

  - You are about to drop the column `sizes` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `sizes` on the `Variant` table. All the data in the column will be lost.
  - Added the required column `colorId` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sizes";

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "color",
DROP COLUMN "sizes",
ADD COLUMN     "colorId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Size" (
    "id" TEXT NOT NULL,
    "size" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SizesOnVariant" (
    "variantId" TEXT NOT NULL,
    "sizeId" TEXT NOT NULL,

    CONSTRAINT "SizesOnVariant_pkey" PRIMARY KEY ("sizeId","variantId")
);

-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "code" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Size_id_key" ON "Size"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Color_id_key" ON "Color"("id");

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SizesOnVariant" ADD CONSTRAINT "SizesOnVariant_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SizesOnVariant" ADD CONSTRAINT "SizesOnVariant_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
