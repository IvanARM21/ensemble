/*
  Warnings:

  - The values [Clothing,Pants,Shoes] on the enum `SizeType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SizeType_new" AS ENUM ('clothing', 'pants', 'shoes');
ALTER TABLE "Size" ALTER COLUMN "type" TYPE "SizeType_new" USING ("type"::text::"SizeType_new");
ALTER TYPE "SizeType" RENAME TO "SizeType_old";
ALTER TYPE "SizeType_new" RENAME TO "SizeType";
DROP TYPE "SizeType_old";
COMMIT;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
