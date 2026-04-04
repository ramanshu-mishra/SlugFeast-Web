/*
  Warnings:

  - The `tokenDeployedsLastId` column on the `blockTimeStamps` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tokenGraduatedsLastId` column on the `blockTimeStamps` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tokenBoughtsLastId` column on the `blockTimeStamps` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tokenSoldsLastId` column on the `blockTimeStamps` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `poolcreatedsLastId` column on the `blockTimeStamps` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tokencreatedLastId` column on the `blockTimeStamps` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "blockTimeStamps" DROP COLUMN "tokenDeployedsLastId",
ADD COLUMN     "tokenDeployedsLastId" BIGINT NOT NULL DEFAULT 0,
DROP COLUMN "tokenGraduatedsLastId",
ADD COLUMN     "tokenGraduatedsLastId" BIGINT NOT NULL DEFAULT 0,
DROP COLUMN "tokenBoughtsLastId",
ADD COLUMN     "tokenBoughtsLastId" BIGINT NOT NULL DEFAULT 0,
DROP COLUMN "tokenSoldsLastId",
ADD COLUMN     "tokenSoldsLastId" BIGINT NOT NULL DEFAULT 0,
DROP COLUMN "poolcreatedsLastId",
ADD COLUMN     "poolcreatedsLastId" BIGINT NOT NULL DEFAULT 0,
DROP COLUMN "tokencreatedLastId",
ADD COLUMN     "tokencreatedLastId" BIGINT NOT NULL DEFAULT 0;
