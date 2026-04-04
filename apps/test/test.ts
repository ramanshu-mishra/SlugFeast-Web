import bcrypt from "bcrypt";
import {prisma} from "@repo/database/client";
const secret = "ramanshuisprettygeniousinhisworkisntHeHuh*";

const publicKey = "0xE9b153007ba7a756C22BBc6Fb221D283845f86F9";
const role = "maalik"

const obj = {
    publicKey,
    role
}

const hs = "$2b$10$/vqytVFReY4ij3fxfBEaYe0YXPk9fuBFkp4WeMaI804rS4ItjUcMa"
const thp = hs.substring(30);

console.log(thp);

const hash=  await bcrypt.hash(thp, 10);




const added = await prisma.apiKeys.create({
    data:{
        apiKey: hash,
        userId: publicKey
    }
});


if(added){
    console.log("admin api key added");
}

