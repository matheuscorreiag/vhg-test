-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_cardId_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "cardId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;
