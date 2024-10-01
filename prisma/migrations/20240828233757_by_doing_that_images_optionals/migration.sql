-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('women', 'men');

-- AlterTable
ALTER TABLE "Brand" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "gender" "Gender"[];
