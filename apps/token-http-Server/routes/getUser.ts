import { router } from "./SingleRouter";
import {prisma} from "@repo/database/client";

router.get("/user", async(req,res)=>{
    const publicKey = req.headers.publicKey;
    
    try{
    const user = await prisma.user.findFirst({
        where:{
            publicKey: publicKey as string
        }
    });

    if(!user){
        throw new Error("User not found");
    }
    res.status(200).json({
        success: true,
        user
    })
}
catch(e){
    res.status(400).json({
        success: false,
        message: "Server side error",
        error:  e instanceof Error ? e.message : "Unexpected Error"
    })
}

    
})