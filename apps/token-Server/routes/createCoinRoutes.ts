import { router } from "./SingleRouter";
import {Request, Response} from "express";
import { checkPublicKey } from "../middlewares/checkPublicKey";
import { checkCoinMetadata } from "../middlewares/checkCoinMetadata";
import {prisma} from "@repo/database/client";
import { signTransaction } from "../utility/signTransaction";
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;

router.post("/createToken", checkPublicKey, checkCoinMetadata, async(req: Request, res: Response) => {
    try {
        const publicKey = req.headers['publickey'] as string;
        const nonce = req.headers.nonce;

        const name = req.body.name;
        const tokenName = req.body.tokenName;
        const symbol = req.body.symbol;
        const description = req.body.description;
        const socials = req.body.socials;
        const email = req.body.email;
        const countryCode = req.body.countryCode;
        const contact = req.body.contact;
        const imageUrl = req.body.imageUrl;
        

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: {
                publicKey: publicKey
            }
        });

        let coinData;
        

        if (existingUser) {
            // User exists, create a new coin for them
            coinData = await prisma.coin.create({
                data: {
                    tokenName,
                    symbol,
                    description,
                    imageUrl,
                    userId: publicKey,
                    socials: {
                        create: {
                            instagram: socials?.instagram,
                            x: socials?.x,
                            telegram: socials?.telegram,
                            youtube: socials?.youtube,
                            website: socials?.website
                        }
                    }
                }
            });
        } else {
            // User doesn't exist, create user and coin together
            const userData = await prisma.user.create({
                data: {
                    publicKey,
                    name,
                    email,
                    countryCode,
                    contact,
                    coins: {
                        create: {
                            tokenName,
                            symbol,
                            description,
                            imageUrl,
                            socials: {
                                create: {
                                    instagram: socials?.instagram,
                                    x: socials?.x,
                                    telegram: socials?.telegram,
                                    youtube: socials?.youtube,
                                    website: socials?.website
                                }
                            }
                        }
                    }
                },
                include: {
                    coins: true
                }
            });
            coinData = userData.coins[0];
        }

        const signature = await signTransaction(publicKey as `0x${string}`, Number(nonce));
          const hash = jwt.sign({address: coinData?.id}, jwtSecret as string);

        const hashAdded = await prisma.tokenHash.create({
            data:{
                hash,
                coinId: coinData?.id as string
            }
        });
        console.log(hashAdded);
        console.log("_____________________________________________");
        if(!hashAdded) throw new Error("Server Side Error");
        

        res.status(201).json({
            success: true,
            message: "Coin created successfully",
            data: coinData,
            signature: signature,
            hash: hash,
            id: coinData?.id
        });

    } catch (error) {
        console.error("Error creating coin:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create coin",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});



router.get("/updateAddress", async(req:Request, res:Response)=>{
    const address = req.headers.address as string;
    const id = req.headers.id as string;

    if(!address || !id){
        res.status(400).json({
            success: false,
            message: "insufficient payload"
        });
        return;
    }
    try{

    
    const updatedCoin =  await prisma.coin.update({
        where:{
            id
        },
        data:{
            address
        }
    });

    if(!updatedCoin){
        res.status(500).json({
            success: false,
            message: "Server side Error"
        });
        return;
    }

  
    }
    catch(e){
        console.log("Error while token address updation");
        res.status(500).json({
            success: false,
            message: "Error in token address updation"
        })
        return;
    }

    res.status(200).json({
        success: true,
        message: "address of coin updated"
    });
})