import WebSocket, {Server} from "ws";
import {IncomingMessage} from "http";
import {validateConnection, sendMessage} from "@repo/wss-utilities/utilities";
import {ActionEnum} from "@repo/wss-utilities/enums";
import type {EventTypes} from "@repo/wss-utilities/enums";
import { MessageResponse_TokenData} from "@repo/messaging/interfaces";
import { TokenRTC } from "./TokenRTC";
import { startSubgraphPoller } from "./subgraphPoller";

type Actions = ActionEnum;

interface messageInterface{
    action?: Actions,
    coinAddress: `0x${string}`,
}


interface responseInterface{
    success: boolean,
    event?: EventTypes,
    action?: ActionEnum,
    message?: string,
    error ?: string,
    data?: MessageResponse_TokenData
}

function isMessageInterface(payload: unknown): payload is messageInterface {
    if (!payload || typeof payload !== "object") {
        return false;
    }

    const data = payload as Record<string, unknown>;
    const action = data.action;
    const coinAddress = data.coinAddress;

    if (action !== ActionEnum.SUBSCRIBE && action !== ActionEnum.UNSUBSCRIBE) {
        return false;
    }

    if (typeof coinAddress !== "string" || !coinAddress.startsWith("0x")) {
        return false;
    }
    return true;
}

let tokenManager: TokenRTC|null = null;

async function main(){
    const wss = new Server({
    port : Number(process.env.WSS_PORT) || 8055
    }, ()=>{
    console.log(`[TOKEN RPC SERVER-2] listening at port ${wss.options.port}`);
});

    tokenManager = await TokenRTC.getTokenRTC();
    await startSubgraphPoller(tokenManager);
    wss.on("connection", async(ws:WebSocket, req:IncomingMessage)=>{
        await validateConnection(ws, req); // checking valid connection

        if(ws.readyState !== WebSocket.OPEN){
            return;
        }

        ws.on("message", (raw)=>{
            try{
                const payload = JSON.parse(raw as string) as unknown;

                if(!isMessageInterface(payload)){
                    sendMessage(ws, {
                        success: false,
                        message: "Insufficient or Invalid Payload"
                    });
                    return;
                }

                const data = payload;
                const action  = data.action;
                const coinAddress = data.coinAddress;
                console.log("[token-rpc-wss-2] incoming action", action, coinAddress);
            

                if(action == ActionEnum.SUBSCRIBE){
                    
                    tokenManager?.subscribe(coinAddress as `0x${string}`, ws);
                }
                else if(action == ActionEnum.UNSUBSCRIBE){
                    tokenManager?.unsubscribe(coinAddress as `0x${string}`, ws);
                }
                else {
                    sendMessage(ws, {
                        success: false,
                        message: "Invalid Action"
                    });
                }
            }
            catch(e){
                sendMessage(ws, {
                    success: false,
                    message: "Insufficient or Invalid Payload"
                })
            }
        })

        ws.on("close", ()=>{
            tokenManager?.handleClosedSocket(ws);
        })
    
    })

}


main();

