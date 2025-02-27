/*
  Warnings:

  - Added the required column `imageUrl` to the `order_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "addressLine2" DROP NOT NULL;

-- AlterTable
ALTER TABLE "order_products" ADD COLUMN     "imageUrl" TEXT NOT NULL;
