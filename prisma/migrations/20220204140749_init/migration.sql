-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT E'RECEIVED';

-- CreateTable
CREATE TABLE "_OrderToProductOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ModToProdToOrderToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToProductOrder_AB_unique" ON "_OrderToProductOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToProductOrder_B_index" ON "_OrderToProductOrder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ModToProdToOrderToOrder_AB_unique" ON "_ModToProdToOrderToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_ModToProdToOrderToOrder_B_index" ON "_ModToProdToOrderToOrder"("B");

-- AddForeignKey
ALTER TABLE "_OrderToProductOrder" ADD FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProductOrder" ADD FOREIGN KEY ("B") REFERENCES "ProductOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModToProdToOrderToOrder" ADD FOREIGN KEY ("A") REFERENCES "ModToProdToOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModToProdToOrderToOrder" ADD FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
