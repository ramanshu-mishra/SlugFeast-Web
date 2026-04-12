/*
  Warnings:

  - You are about to drop the `marketCapChanges` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "marketCapChanges" DROP CONSTRAINT "marketCapChanges_coinAddress_fkey";

-- AlterTable
ALTER TABLE "coin" ADD COLUMN     "lastTimeStamp" TEXT NOT NULL DEFAULT '0';

-- DropTable
DROP TABLE "marketCapChanges";
