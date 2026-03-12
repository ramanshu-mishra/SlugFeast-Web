-- CreateTable
CREATE TABLE "blockTimeStamps" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "tokenDeployedsTimestamp" INTEGER NOT NULL DEFAULT 0,
    "tokenDeployedsLastId" INTEGER NOT NULL DEFAULT 0,
    "tokenGraduatedsTimestamp" INTEGER NOT NULL DEFAULT 0,
    "tokenGraduatedsLastId" INTEGER NOT NULL DEFAULT 0,
    "tokenBoughtsTimestamp" INTEGER NOT NULL DEFAULT 0,
    "tokenBoughtsLastId" INTEGER NOT NULL DEFAULT 0,
    "tokenSoldsTimestamp" INTEGER NOT NULL DEFAULT 0,
    "tokenSoldsLastId" INTEGER NOT NULL DEFAULT 0,
    "poolcreatedsTimestamp" INTEGER NOT NULL DEFAULT 0,
    "poolcreatedsLastId" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blockTimeStamps_pkey" PRIMARY KEY ("id")
);
