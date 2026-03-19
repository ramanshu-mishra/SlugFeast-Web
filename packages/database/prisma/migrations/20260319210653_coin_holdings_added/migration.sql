-- CreateTable
CREATE TABLE "holding" (
    "id" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "userAddress" TEXT NOT NULL,

    CONSTRAINT "holding_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "holding" ADD CONSTRAINT "holding_userAddress_fkey" FOREIGN KEY ("userAddress") REFERENCES "user"("publicKey") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holding" ADD CONSTRAINT "holding_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
