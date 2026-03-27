import abi from "@repo/abi/abi";
import {Contract, ethers, Wallet} from "ethers";
import {prisma} from "@repo/database/client";

const provider = new ethers.WebSocketProvider(process.env.SEPOLIA_WS_URL as string);
const wallet = new Wallet(process.env.PRIVATE_KEY as string, provider);

const contract = new Contract(process.env.CONTRACT_ADDRESS as string, abi, provider);


async function tokenExists(id:string): Promise<boolean> {
    const token = await prisma.coin.findFirst({
        where:{
            id: id
        }
    });

    if(token){
        return true;
    }
    return false;
}


// TokenCreated( address indexed token, string indexed id);
contract.on("TokenCreated", async(token: string, id : string, event)=>{
    console.log("kuch toh mila bhosdi...");
    const exists = await tokenExists(id);
    if(!exists){
        console.log("token doesnot exists in backend");
        return;
    }

    await prisma.coin.update({
        where:{
            id 
        },
        data:{
            address: token
        }
    });

    console.log(JSON.stringify({
        action: "Token Address Updated",
        id: id,
        address: token
    }));

})

console.log("mai bhosdika hoon");