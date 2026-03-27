import { EventType, TransactionEvents } from "./share/enum";
import WebSocket from "ws";

const CombinedEnum  =  {...EventType, ...TransactionEvents};

export class TokenRPC{
   subscribers = new Map<keyof typeof CombinedEnum, Set<WebSocket>>;
   static singleTon:TokenRPC|null = null;
    static getTokenRPC(){
        if(this.singleTon == null){
            this.singleTon = new TokenRPC();
        }
        return this.singleTon;
   }

   broadCast(eventType: keyof typeof CombinedEnum, message: Object){ 
        this.subscribers.get(eventType)?.forEach(ws=>{
            if(ws.readyState == ws.OPEN){
                ws.send(message);
            }
        })
   }

   subscribeEvent(eventType: keyof typeof CombinedEnum, ws:WebSocket){
        let sockets = this.subscribers.get(eventType);
        if(!sockets){
            sockets = new Set();
            this.subscribers.set(eventType, sockets);
        }
        sockets.add(ws);
   }    

   unsubscribeEvent(eventType: keyof typeof CombinedEnum, ws: WebSocket){
        const sockets = this.subscribers.get(eventType);
        if(!sockets)return;
        sockets.delete(ws);
   }

   subscribeAll(ws:WebSocket){
        Object.keys(CombinedEnum).forEach(k=>{
            this.subscribeEvent(k as keyof typeof CombinedEnum, ws);
        });
   }

   unsubscribeAll(ws:WebSocket){
        Object.keys(CombinedEnum).forEach(k=>{
            this.unsubscribeEvent(k as keyof typeof CombinedEnum, ws);
        })
   }

}