ALTER TABLE "blockTimeStamps"
  ALTER COLUMN "tokenDeployedsLastId" TYPE TEXT USING "tokenDeployedsLastId"::text,
  ALTER COLUMN "tokenGraduatedsLastId" TYPE TEXT USING "tokenGraduatedsLastId"::text,
  ALTER COLUMN "tokenBoughtsLastId" TYPE TEXT USING "tokenBoughtsLastId"::text,
  ALTER COLUMN "tokenSoldsLastId" TYPE TEXT USING "tokenSoldsLastId"::text,
  ALTER COLUMN "poolcreatedsLastId" TYPE TEXT USING "poolcreatedsLastId"::text,
  ALTER COLUMN "tokencreatedLastId" TYPE TEXT USING "tokencreatedLastId"::text;
