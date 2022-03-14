/*
  Warnings:

  - You are about to drop the `_ModToProdToOrderToOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OrderToProductOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ModToProdToOrderToOrder" DROP CONSTRAINT "_ModToProdToOrderToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_ModToProdToOrderToOrder" DROP CONSTRAINT "_ModToProdToOrderToOrder_B_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProductOrder" DROP CONSTRAINT "_OrderToProductOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProductOrder" DROP CONSTRAINT "_OrderToProductOrder_B_fkey";

-- DropTable
DROP TABLE "_ModToProdToOrderToOrder";

-- DropTable
DROP TABLE "_OrderToProductOrder";
