-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_products_id_fkey";

-- AlterTable
ALTER TABLE "product_images" ALTER COLUMN "products_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_products_id_fkey" FOREIGN KEY ("products_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
