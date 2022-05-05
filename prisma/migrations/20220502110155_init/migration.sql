/*
  Warnings:

  - Added the required column `sum` to the `ModToProd` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ModToProd" ADD COLUMN     "sum" INTEGER NOT NULL;
