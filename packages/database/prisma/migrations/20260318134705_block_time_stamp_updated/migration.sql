-- AlterTable
ALTER TABLE "blockTimeStamps" ADD COLUMN     "tokencreatedLastId" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tokencreatedsTimestamp" INTEGER NOT NULL DEFAULT 0;
