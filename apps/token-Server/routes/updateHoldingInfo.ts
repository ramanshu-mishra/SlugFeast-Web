import { Request, Response } from "express";
import { router } from "./SingleRouter";
import { GetBucketEncryptionRequest$ } from "@aws-sdk/client-s3";
import { isAddress } from "ethers";
import {prisma} from "@repo/database/client"
const TotalTokens = process.env.TOTAL_TOKENS || 1*10**9*10**6; // 1 billion tokens 

router.get("/updateHolding/:action", async(req: Request, res:Response)=>{
    const action = req.params.action;
    const Useraddress = req.headers.address;
    const tokenAdress = req.headers.tokenAddress;
    const amount = req.headers.amount;
    
    if(action != "buy" || "sell"){
        res.status(400).json({
            success: false,
            message: "Invalid Action performed"
        });
        return;
    }
    if(!Useraddress || !tokenAdress || !amount || isNaN(Number(amount)) || !isAddress(Useraddress) || !isAddress(tokenAdress)){
        res.status(400).json({
            success: false,
            message: "Invalid Payload"
        });
    }

    try{

   
}
catch(e){
    const message = e instanceof Error ? e.message : "Something went wrong";
    res.status(200).json({
        success: false,
        message: message
    });
    return;
}

res.status(200).json({
    success: true,
    mesasge: "succesfully updated holding info"
});
return;
});

