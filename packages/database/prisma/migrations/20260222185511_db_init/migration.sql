-- CreateTable
CREATE TABLE "user" (
    "publicKey" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "countryCode" TEXT,
    "contact" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("publicKey")
);

-- CreateTable
CREATE TABLE "socials" (
    "id" TEXT NOT NULL,
    "instagram" TEXT,
    "x" TEXT,
    "telegram" TEXT,
    "youtube" TEXT,
    "website" TEXT,
    "coinId" TEXT NOT NULL,

    CONSTRAINT "socials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coin" (
    "id" TEXT NOT NULL,
    "address" TEXT,
    "tokenName" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "graduated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "coin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_publicKey_key" ON "user"("publicKey");

-- CreateIndex
CREATE UNIQUE INDEX "socials_id_key" ON "socials"("id");

-- CreateIndex
CREATE UNIQUE INDEX "socials_coinId_key" ON "socials"("coinId");

-- CreateIndex
CREATE UNIQUE INDEX "coin_address_key" ON "coin"("address");

-- AddForeignKey
ALTER TABLE "socials" ADD CONSTRAINT "socials_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coin" ADD CONSTRAINT "coin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("publicKey") ON DELETE RESTRICT ON UPDATE CASCADE;
