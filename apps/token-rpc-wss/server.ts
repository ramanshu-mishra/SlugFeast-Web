import WebSocket, {Server} from "ws";
import { ActionEnum } from "./share/enum";
import { EventTypes } from "./interfaces/eventsInterface";
import type {IncomingMessage} from "http";
import {validateConnection} from "@repo/wss-utilities/utilities"
import { TokenRPC } from "./TokenRPC";
import {createClient, RedisClientType} from "redis";
import "dotenv/config";
import { MessageResponse } from "./interfaces/messageInterface";


interface messageInterface{
    action: ActionEnum,
    coinAddress?: `0x${string}`
}

interface responseInterface{
    success: boolean,
    event?: EventTypes,
    action?: ActionEnum,
    message?: string,
    error ?: string,
    data?: MessageResponse
}

const tokenRpc = TokenRPC.getTokenRPC();

let wss: Server;
let client: RedisClientType;


async function main(){
     wss = new Server({
    port :  Number(process.env.TOKEN_RPC_PORT as string) || 8011
}, 
()=>{
    console.log("[Token RPC Server] Running at port ", wss.options.port);
}); 


    client = createClient({
        url: process.env.REDIS_CLIENT_URL || "redis://localhost:6379"
    });

    await client.connect();


    wss.on("connection", async (ws: WebSocket, req: IncomingMessage)=>{
    await validateConnection(ws, req);

    if(ws.readyState !== WebSocket.OPEN){
        return;
    }
    
    ws.on("message", (raw)=>{
        let data: messageInterface;
        try{
            data = JSON.parse(raw.toString()) as messageInterface;
        }
        catch{
            sendMessage(ws, {
                success: false,
                error: "Invalid JSON payload"
            });
            return;
        }

        const action = data.action;
        const coinAddress = data.coinAddress;

        if(!action){
            sendMessage(ws, {
                success: false,
                error: "Invalid Payload"
            })
        }

        if(action == ActionEnum.SUBSCRIBE && coinAddress ){
            tokenRpc.subscribe(coinAddress, ws);
            sendMessage(ws, {
                success: true,
                action,
                message: `Subscribed to ${coinAddress}`
            });
        }
        else if(action == ActionEnum.SUBSCRIBE_ALL){
            tokenRpc.subscribeAll(ws);
            sendMessage(ws, {
                success: true,
                action,
                message: "Subscribed to all events"
            });
        }
        else if(action == ActionEnum.UNSUBSCRIBE && coinAddress){
            tokenRpc.unsubscribe(coinAddress, ws);
            sendMessage(ws, {
                success: true,
                action,
                message: `Unsubscribed from ${coinAddress}`
            });
        }
        else if(action == ActionEnum.UNSUBSCRIBE_ALL){
            tokenRpc.unsubscribeAll(ws);
            sendMessage(ws, {
                success: true,
                action,
                message: "Unsubscribed from all events"
            });
        }
        else{
            sendMessage(ws, {
                success: false,
                action,
                error: "Unsupported action"
            });
        }
        
    });
    
    ws.on("error", ()=>{
        sendMessage(ws, {
            success: false,
            message: "Server Side Error"
        });
    })

    ws.on("close", ()=>{
        tokenRpc.unsubscribeAll(ws);
        console.log(`> ${req.socket.remoteAddress} disconnected`);
    });
})
}



main();



function sendMessage(ws: WebSocket, message: responseInterface){
    if(ws.readyState == WebSocket.OPEN){
        ws.send(JSON.stringify(message));
    }
}
