/*
  Warnings:

  - Made the column `rating` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "rating" SET NOT NULL;
