-- CreateTable
CREATE TABLE "apiKeys" (
    "id" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "apiKeys_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "apiKeys" ADD CONSTRAINT "apiKeys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("publicKey") ON DELETE RESTRICT ON UPDATE CASCADE;
