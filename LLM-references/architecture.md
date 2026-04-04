This file containes the architecture that needs to be followed while creating file and folders in this application

# worker
 
 - In workers there should be a top level server.ts
 - Worker uses redis to create a queue , the queue data gets snapshotted at every 1 second so that it can be recovered in case server goes down
 - there should be a single async loop that continously takes data from the queue and stores it in the postgres database
 - format of data in the queue will be 
        {
            event : "buy"/"sell",
            coinAddress: `0x${string}`,
            poolTokens: BigInt
            poolVETHs: BigInt
        }   

 - and you need to batch update all these transactions to the database , to avoid too many db writes. 
 - where to update: 
   - update in the Coins model in prisma schema. 
   - update the poolTokens IN TokenAmount, and poolVETHs in VETHAmount row.
  
Note: only the latest event sorted according to the blockTimeStamp and lastId shoul

File managemant: 
  - functions to update the prisma db should be created in a seperate file called updateHandler.ts
  - all interfaces should be in a seperate holder called interfaces 