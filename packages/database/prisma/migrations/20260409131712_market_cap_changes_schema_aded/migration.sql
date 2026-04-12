-- CreateTable
CREATE TABLE "marketCapChanges" (
    "coinAddress" TEXT NOT NULL,
    "change_5min" TEXT NOT NULL DEFAULT '0',
    "change_15min" TEXT NOT NULL DEFAULT '0',
    "change_30min" TEXT NOT NULL DEFAULT '0',
    "change_1h" TEXT NOT NULL DEFAULT '0',
    "change_1D" TEXT NOT NULL DEFAULT '0',
    "change_5D" TEXT NOT NULL DEFAULT '0',
    "change_1M" TEXT NOT NULL DEFAULT '0',
    "change_1Y" TEXT NOT NULL DEFAULT '0',

    CONSTRAINT "marketCapChanges_pkey" PRIMARY KEY ("coinAddress")
);

-- AddForeignKey
ALTER TABLE "marketCapChanges" ADD CONSTRAINT "marketCapChanges_coinAddress_fkey" FOREIGN KEY ("coinAddress") REFERENCES "coin"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
