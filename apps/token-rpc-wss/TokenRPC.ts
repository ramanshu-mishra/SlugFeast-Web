import WebSocket from "ws";
import { MessageResponse, QueueData } from "./interfaces/messageInterface";
import {RedisClientType} from "redis";


const EVENT_KEY = process.env.REDIS_EVENT_KEY ?? "events";
export class TokenRPC{
   private subscribers = new Map<`0x${string}`, Set<WebSocket>>();
   private subscribedAll = new Set<WebSocket>;
   private static singleTon:TokenRPC|null = null;
   private static redisClient: RedisClientType|null;

    static getTokenRPC(redisClient: RedisClientType){
        if(this.singleTon == null){
            this.singleTon = new TokenRPC();
            this.redisClient = redisClient;
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

   static pushRedisEvent(coinAddress: `0x${string}`, event: QueueData ){
    if(!this.redisClient)return;
        this.redisClient.hSet(EVENT_KEY, coinAddress, JSON.stringify(event));
        console.log("pushed to redis ", coinAddress, event);
   }

}



