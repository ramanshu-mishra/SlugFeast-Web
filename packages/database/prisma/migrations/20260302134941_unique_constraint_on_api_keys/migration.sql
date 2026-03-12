/*
  Warnings:

  - A unique constraint covering the columns `[apiKey]` on the table `apiKeys` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "apiKeys_apiKey_key" ON "apiKeys"("apiKey");
