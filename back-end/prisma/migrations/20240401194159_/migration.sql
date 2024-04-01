-- AlterTable
ALTER TABLE "UserCredit" ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserDebt" ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false;
