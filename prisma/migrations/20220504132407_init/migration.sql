/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `ProductOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ProductOrder" DROP CONSTRAINT "ProductOrder_modToProdId_fkey";

-- AlterTable
ALTER TABLE "ProductOrder" ADD COLUMN     "productId" INTEGER,
ALTER COLUMN "modToProdId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProductOrder_productId_key" ON "ProductOrder"("productId");

-- AddForeignKey
ALTER TABLE "ProductOrder" ADD CONSTRAINT "ProductOrder_modToProdId_fkey" FOREIGN KEY ("modToProdId") REFERENCES "ModToProd"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOrder" ADD CONSTRAINT "ProductOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
