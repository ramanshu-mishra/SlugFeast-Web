/*
  Warnings:

  - The primary key for the `holding` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `holding` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userAddress]` on the table `holding` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "holding" DROP CONSTRAINT "holding_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "holding_pkey" PRIMARY KEY ("coinId", "userAddress");

-- CreateIndex
CREATE UNIQUE INDEX "holding_userAddress_key" ON "holding"("userAddress");
