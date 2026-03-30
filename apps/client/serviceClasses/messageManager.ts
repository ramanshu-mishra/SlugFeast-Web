import WebSocket from "ws";
import {messageResponse} from "@repo/messaging/interfaces";


//I am using the observer pattern to decouple stateChanges from this class .
// Instead of giving setStaetAction as a parameter to this class , it will maintain some listeners (Callback calling setActionState) and will call the callbacks with appropriate data whenever new message is recieved from the server.

export class messageManager{
    _singleTon : messageManager|null = null;
    client : WebSocket|null = null;
    coinAddress: `0x${string}`|null  = null;
    userAddress: `0x${string}`|null = null;


     async getMessageManager(coinAddress: `0x${string}`, userAddress: `0x${string}`){
        if(this._singleTon == null){
            this._singleTon = new messageManager();
            this.coinAddress = coinAddress;
            this.userAddress = userAddress;
            this.client = new WebSocket(process.env.NEXT_PUBLIC_MESSAGING_SERVER_ADDRESS as string, {
                headers:{
                    authorization: process.env.NEXT_PUBLIC_SLUGFEAST_API_KEY as string
                }
            });
            while(this.client.readyState == WebSocket.CONNECTING){
                await new Promise(r=>{
                    setTimeout(r, 200);
                })
            }
        }
        return this._singleTon;
    }

    sendMessage(message: object){
        if(this.client?.readyState == WebSocket.OPEN){
            this.client.send(message);
        }
    }


    init_handlers(){
        if(!this.client){
            console.log("Socket not initialized");
            return;
        }
        
        this.client.on("message", (raw)=>{
            try{
            const data = JSON.parse(raw.toString()) as messageResponse;
            if(data.success){

            }
            else{
            
            }
        }
        catch(e){
            console.log("[Message Server Error]: Could not parse message server response");
        }

        })
    }


}

