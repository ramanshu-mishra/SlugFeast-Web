-- CreateTable
CREATE TABLE "tokenHash" (
    "hash" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,

    CONSTRAINT "tokenHash_pkey" PRIMARY KEY ("hash")
);

-- CreateIndex
CREATE UNIQUE INDEX "tokenHash_coinId_key" ON "tokenHash"("coinId");

-- AddForeignKey
ALTER TABLE "tokenHash" ADD CONSTRAINT "tokenHash_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
