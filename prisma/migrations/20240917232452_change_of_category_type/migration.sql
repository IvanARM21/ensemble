-- Comenzar una transacción
BEGIN;

-- Alterar el tipo de enumeración CategoryType
-- Paso 1: Crear el nuevo tipo de enumeración
CREATE TYPE "CategoryType_new" AS ENUM ('clothing', 'accessories', 'shoes');

-- Paso 2: Cambiar la columna "type" en la tabla "Category" para usar el nuevo tipo
ALTER TABLE "Category" ALTER COLUMN "type" TYPE "CategoryType_new" USING ("type"::text::"CategoryType_new");

-- Paso 3: Renombrar el antiguo tipo de enumeración y el nuevo tipo
ALTER TYPE "CategoryType" RENAME TO "CategoryType_old";
ALTER TYPE "CategoryType_new" RENAME TO "CategoryType";

-- Paso 4: Eliminar el antiguo tipo de enumeración
DROP TYPE "CategoryType_old";

-- Confirmar la transacción
COMMIT;

-- Eliminar la restricción que depende del índice
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_colorId_fkey";

-- Eliminar el índice
DROP INDEX "Color_id_key";

-- Crear la restricción de clave primaria en la tabla Color
ALTER TABLE "Color" ADD CONSTRAINT "Color_pkey" PRIMARY KEY ("id");

-- Eliminar la columna "type" de la tabla "Product"
ALTER TABLE "Product" DROP COLUMN "type";

-- Añadir la columna "stock" a la tabla "SizesOnVariant"
ALTER TABLE "SizesOnVariant" ADD COLUMN "stock" INTEGER NOT NULL;
