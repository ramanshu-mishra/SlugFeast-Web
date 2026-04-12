import { MessageResponse_TokenData, TradeEvent } from "@repo/messaging/interfaces";
import { ActionEnum } from "@repo/wss-utilities/enums";



export class CoinRTCManager{
    private static _singleton: CoinRTCManager|null  = null;
    private serverAddress = process.env.NEXT_PUBLIC_TOKEN_RTC_WSS_URL ;
    private client : WebSocket|null = null;
    private apiKey: string|null = null;
    private data_listeners : Map<string, Set<(x:MessageResponse_TokenData)=>void>> = new Map();
    private trade_listeners: Map<string, Set<(x:TradeEvent)=>void> > = new Map();

    
    static getCoinRTCManager(){
        if(!this._singleton){
            this._singleton = new CoinRTCManager();
            this._singleton.apiKey =  process.env.NEXT_PUBLIC_SLUGFEAST_API_KEY as string
            this._singleton.client = new WebSocket(this._singleton.serverAddress as string, [this._singleton.apiKey]);
            this._singleton.init_handlers();
            
        }
        console.log("CoinRTCManager initialized");
        return this._singleton
    }

    getWSClient(){
        return this.client;
    }


    private init_handlers(){
        if(!this.client){
            throw new Error("WS Client is not initialized");
        }

        this.client.onmessage = (event: MessageEvent)=>{
            try {
                const raw = event.data;
                console.log(raw);
                let payload : object|null = null;
                try{
                    payload = JSON.parse(raw as string);
                }
                catch(e){
                    console.log("Invalid payload format from server");
                    return;
                }

                if (!payload || typeof payload !== "object") {
                    return;
                }

                const coinAddress = (payload as { coinAddress?: string }).coinAddress;
                if (!coinAddress || typeof coinAddress !== "string") {
                    return;
                }

                if ((payload as { event?: string }).event == "TradeEvent") {
                    this.handleTradeEvent(coinAddress as `0x${string}`, payload as TradeEvent);
                    return;
                }

                this.handleTokenData(coinAddress as `0x${string}`, payload as MessageResponse_TokenData);
            }
            catch (err) {
                console.error("[CoinRTCManager] invalid WS payload", err);
            }
        }

        this.client.onclose = ()=>{
            this.client = new WebSocket(this.serverAddress as string, [this.apiKey as string]);
            this.init_handlers();
        }
    }

    private handleTradeEvent(coinAddress: `0x${string}`,payload: TradeEvent){
        const st = this.trade_listeners.get(coinAddress);
        if(!st)return;
        st.forEach(callback=>{
            callback(payload);
        })
        console.log(`[TradeEvent] : `, payload);
    }   

    private handleTokenData(coinAddress: `0x${string}`,payload: MessageResponse_TokenData){
        const st = this.data_listeners.get(coinAddress);
        if(!st)return;
        st.forEach(callback=>{
            callback(payload);
        })
        console.log(`[CoinData] : `, payload);
    }

    add_coin_data_listener(coinAddress: `0x${string}`, callback: (x: MessageResponse_TokenData)=>void){
        let st = this.data_listeners.get(coinAddress);
        if(!st){
            st = new Set();
            this.data_listeners.set(coinAddress, st);
        }
        st.add(callback);

        return ()=>{
            this.remove_coin_data_listener(coinAddress, callback);
        }
    }

    remove_coin_data_listener(coinAddress: `0x${string}`, callback: (x:MessageResponse_TokenData)=>void){
        const st = this.data_listeners.get(coinAddress);
        if(!st)return;
        st.delete(callback);
    } 
    
    add_trade_listener(coinAddress: `0x${string}`, callback: (x:TradeEvent)=>void){
         let st = this.trade_listeners.get(coinAddress);
        if(!st){
            st = new Set();
            this.trade_listeners.set(coinAddress, st);
        }
        st.add(callback);

        return ()=>this.remove_trade_listener(coinAddress, callback);
    }

    remove_trade_listener(coinAddress: `0x${string}`, callback: (x:TradeEvent)=>void){
         const st = this.trade_listeners.get(coinAddress);
        if(!st)return;
        st.delete(callback);
    }

     subscribe(coinAddress: `0x${string}`){
        if(!this.client){
            throw new Error("Client not initialized");
        }

        if(this.client.readyState != WebSocket.OPEN)return;

       
        this.client.send(JSON.stringify({
            action: ActionEnum.SUBSCRIBE,
            coinAddress
        }));
        
        return ()=>{
            this.unsubscribe(coinAddress);
        }
    }

    unsubscribe(coinAddress: `0x${string}`){
        if(!this.client){
            return;
        }
        if(this.client.readyState != WebSocket.OPEN)return;


        this.client.send(JSON.stringify({
            action:     ActionEnum.UNSUBSCRIBE,
            coinAddress
        }));

    }
}


