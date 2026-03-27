import WebSocket, {Server} from "ws";
import { ActionEnum, CombinedInterface } from "./share/enum";
import type {IncomingMessage} from "http";
import {validateConnection} from "@repo/wss-utilities/utilities"
import { TokenRPC } from "./TokenRPC";



interface messageInterface{
    event: keyof typeof CombinedInterface
    action: ActionEnum
}

interface responseInterface{
    success: boolean,
    event?: keyof typeof CombinedInterface,
    action?: ActionEnum,
    message?: string,
    error ?: string
}

const tokenRpc = TokenRPC.getTokenRPC();


const wss = new Server({
    port :  Number(process.env.TOKEN_RPC_PORT as string) || 8011
}, 
()=>{
    console.log("[Token RPC Server] Running at port ", wss.options.port);
});

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

        const event = data.event;
        const action = data.action;

        if(!action){
            sendMessage(ws, {
                success: false,
                error: "Invalid Payload"
            })
        }

        if(action == ActionEnum.SUBSCRIBE && event ){
            tokenRpc.subscribeEvent(event, ws);
            sendMessage(ws, {
                success: true,
                action,
                event,
                message: `Subscribed to ${event}`
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
        else if(action == ActionEnum.UNSUBSCRIBE && event){
            tokenRpc.unsubscribeEvent(event, ws);
            sendMessage(ws, {
                success: true,
                action,
                event,
                message: `Unsubscribed from ${event}`
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


function sendMessage(ws: WebSocket, message: responseInterface){
    if(ws.readyState == WebSocket.OPEN){
        ws.send(JSON.stringify(message));
    }
}
