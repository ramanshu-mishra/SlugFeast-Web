
import {ActionEnum} from "@repo/wss-utilities/enums";
import { MessageResponse } from "../components/athBar";




export class globalCoinDataManager{
    
    private static _singleton:globalCoinDataManager|null = null;
    private static client:WebSocket|null = null;
    private static  apiKey: string;
    private listeners: Map<string, Set<(m:MessageResponse)=>void>> = new Map();
    private static serverAddress :string|null = null;

    static getGlobalCoinDataManager(){
        if(!this._singleton){
            this.serverAddress = process.env.NEXT_PUBLIC_GLOBAL_WS_SERVER_URL as string;
            this._singleton = new globalCoinDataManager();
            this.apiKey =  process.env.NEXT_PUBLIC_SLUGFEAST_API_KEY as string
            this.client = new WebSocket(this.serverAddress, [this.apiKey]);
            this._singleton.init_handlers();
        }
        return this._singleton;
    }

    
    getWSClient(){
        return globalCoinDataManager.client;
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
           return;
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
        
                const coinAddress = parsed.coinAddress;
                const callbacks = this.listeners.get(coinAddress);
                if(!callbacks){
                    throw new Error("[stale data] Unsubscribed Coin data "); 
                }
                callbacks.forEach(callback => callback(parsed));
            } catch(e) {
               
            }
          
        };

        globalCoinDataManager.client.onclose = ()=>{
            globalCoinDataManager.client = new WebSocket(globalCoinDataManager.serverAddress as string, [globalCoinDataManager.apiKey as string]);
            this.init_handlers();
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