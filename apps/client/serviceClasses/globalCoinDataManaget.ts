
import {ActionEnum, EventType, TransactionEvents } from "@repo/wss-utilities/enums";
import type EventTypes from "@repo/wss-utilities/enums";
import { MessageResponse } from "../components/athBar";




export class globalCoinDataManager{
    
    private static _singleton:globalCoinDataManager|null = null;
    private static client:WebSocket|null = null;
    private static  apiKey: string;
    private listeners: Map<string, Set<(m:MessageResponse)=>void>> = new Map();

    static getGlobalCoinDataManager(url:string){
        if(!this._singleton){
            this._singleton = new globalCoinDataManager();
            this.apiKey =  process.env.NEXT_PUBLIC_SLUGFEAST_API_KEY as string
            this.client = new WebSocket(url, [this.apiKey]);
            this._singleton.init_handlers();
        }
        return this._singleton;
    }

    

    subscribe(coins?: string[], all?: boolean){ 
        if(!coins && !all){
            throw new Error("at least one argument is required");
        }
        if(!globalCoinDataManager.client  || globalCoinDataManager.client.readyState != WebSocket.OPEN){
             throw new Error("WebSocket client is not connected");
        }
        if(all){
            globalCoinDataManager.client.send(JSON.stringify({
                action: ActionEnum.SUBSCRIBE_ALL
            }));
        }
        else{
            coins?.forEach((coinAddress)=>{
                globalCoinDataManager.client?.send(JSON.stringify({
                    action: ActionEnum.SUBSCRIBE,
                    coinAddress
                }));
            })
        }
    }

    unsubscribe(coins?: string[], all?: boolean){
        if(!coins && !all){
            throw new Error("at least one argument required");
        }
        if(!globalCoinDataManager.client || globalCoinDataManager.client.readyState !== WebSocket.OPEN){
            throw new Error("WebSocket client is not connected");
        }

        if(all){
            globalCoinDataManager.client.send(JSON.stringify({
                action: ActionEnum.UNSUBSCRIBE_ALL
            }));
        }
        else{
            coins?.forEach((coinAddress)=>{
                globalCoinDataManager.client?.send(JSON.stringify({
                    action: ActionEnum.UNSUBSCRIBE,
                    coinAddress
                }));
            })
        }
    }


    private  init_handlers(){
        if(!globalCoinDataManager.client){
            throw new Error("WS Client is not initialized");
        }

        const client = globalCoinDataManager.client;
        client.onmessage = (event: MessageEvent) => {
            const payload = event.data;
            
            try {
                const parsed = JSON.parse(payload) as MessageResponse;
                console.log(`[New message] `, parsed);
                const coinAddress = parsed.coinAddress;
                const callbacks = this.listeners.get(coinAddress);
                if(!callbacks){
                    throw new Error("[stale data] Unsubscribed Coin data "); 
                }
                callbacks.forEach(callback => callback(parsed));
            } catch(e) {
                console.log(`[handler error] ${e}`);
            }
          
        };

        client.onclose = ()=>{
            console.log("ws client closed")
        }
    }


    addListener(coinAddress:`0x${string}`,callback: (m:MessageResponse)=>void){
        let st = this.listeners.get(coinAddress);
        if(!st){
            st = new Set();
            this.listeners.set(coinAddress, st);
        }
        st.add(callback);

        return ()=>{
            this.removeListener(coinAddress, callback);
        }
    }

    removeListener(coinAddress: `0x${string}` ,callback: (m:MessageResponse)=>void){
       const st = this.listeners.get(coinAddress);
       if(!st)return;
       st.delete(callback);
    }

}