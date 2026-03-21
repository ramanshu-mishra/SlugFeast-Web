/*
  Warnings:

  - A unique constraint covering the columns `[coinId]` on the table `holding` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "holding_coinId_key" ON "holding"("coinId");
