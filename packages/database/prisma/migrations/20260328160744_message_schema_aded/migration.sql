-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL,
    "message" TEXT,
    "userKey" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "referencedMessageId" TEXT,
    "dateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messageImage" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,

    CONSTRAINT "messageImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "messageImage_messageId_key" ON "messageImage"("messageId");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "coin"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_userKey_fkey" FOREIGN KEY ("userKey") REFERENCES "user"("publicKey") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_referencedMessageId_fkey" FOREIGN KEY ("referencedMessageId") REFERENCES "message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messageImage" ADD CONSTRAINT "messageImage_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
