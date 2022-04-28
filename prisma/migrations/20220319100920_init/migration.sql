-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "source" TEXT;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "status" SET DEFAULT E'SUCCEEDED';
