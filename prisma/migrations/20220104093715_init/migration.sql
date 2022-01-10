/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Label` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Label" ALTER COLUMN "image" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Label_name_key" ON "Label"("name");
