import WebSocket from "ws";
import { MessageResponse } from "./interfaces/messageInterface";

export class TokenRPC{
   subscribers = new Map<`0x${string}`, Set<WebSocket>>();
   subscribedAll = new Set<WebSocket>;
   static singleTon:TokenRPC|null = null;
    static getTokenRPC(){
        if(this.singleTon == null){
            this.singleTon = new TokenRPC();
        }
        return this.singleTon;
   }

   broadCast(coinAddress: `0x${string}`, message: MessageResponse){
        this.subscribers.get(coinAddress)?.forEach(ws=>{
            if(ws.readyState == ws.OPEN){
                ws.send(JSON.stringify(message));
            }
        })
   }

   subscribe(coinAddress: `0x${string}`, ws:WebSocket){
        let sockets = this.subscribers.get(coinAddress);
        if(!sockets){
            sockets = new Set();
            this.subscribers.set(coinAddress, sockets);
        }
        sockets.add(ws);
   }    

   unsubscribe(coinAddress: `0x${string}`, ws: WebSocket){
        const sockets = this.subscribers.get(coinAddress);
        if(!sockets)return;

        sockets.delete(ws);

        if (sockets.size === 0) {
            this.subscribers.delete(coinAddress);
        }
        ws.close();
   }

   subscribeAll(ws: WebSocket){
        this.subscribedAll.add(ws);
   }


   unsubscribeAll(ws:WebSocket){
        this.subscribers.forEach((sockets, coinAddress) => {
            sockets.delete(ws);
            if (sockets.size === 0) {
                this.subscribers.delete(coinAddress);
            }
        });

        this.subscribedAll.delete(ws);
        ws.close();
   }

}

