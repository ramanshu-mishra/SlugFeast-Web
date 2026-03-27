/*
  Warnings:

  - The primary key for the `holding` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `coinId` on the `holding` table. All the data in the column will be lost.
  - Added the required column `coinAddress` to the `holding` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "holding" DROP CONSTRAINT "holding_coinId_fkey";

-- AlterTable
ALTER TABLE "holding" DROP CONSTRAINT "holding_pkey",
DROP COLUMN "coinId",
ADD COLUMN     "coinAddress" TEXT NOT NULL,
ADD CONSTRAINT "holding_pkey" PRIMARY KEY ("coinAddress", "userAddress");

-- AddForeignKey
ALTER TABLE "holding" ADD CONSTRAINT "holding_coinAddress_fkey" FOREIGN KEY ("coinAddress") REFERENCES "coin"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
