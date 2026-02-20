-- CreateTable
CREATE TABLE "user" (
    "publicKey" TEXT NOT NULL,
    "tokenName" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "counrtyCode" TEXT,
    "contact" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("publicKey")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_publicKey_key" ON "user"("publicKey");
