import {messageResponse, StoredMessage} from "@repo/messaging/interfaces";

export type OutgoingMessagePayload = {
    userKey: string;
    coinId: string;
    messageType: "text" | "image" | "hybrid";
    message?: string;
    referencedMessageId?: string;
    imageUrl?: string;
};


//I am using the observer pattern to decouple stateChanges from this class .
// Instead of giving setStaetAction as a parameter to this class , it will maintain some listeners (Callback calling setActionState) and will call the callbacks with appropriate data whenever new message is recieved from the server.

export class messageManager{
    private static _singleTon : messageManager|null = null;
    private  client : WebSocket|null = null;
    private  listeners: Set<(m:StoredMessage)=>void> = new Set();
    private  errorListeners: Set<(e:Error)=>void> = new Set();
    private readonly serverAddress: string | null = null;
    private readonly apiKey: string | null = null;
    private reconnectTimeoutId: ReturnType<typeof setTimeout> | null = null;
    private hasScheduledReconnect = false;


     static  getMessageManager(){
        if(this._singleTon == null){
            this._singleTon = new messageManager();
        }
        return this._singleTon;
    }


    constructor(){
        this.serverAddress = process.env.NEXT_PUBLIC_MESSAGING_SERVER_ADDRESS ?? null;
        this.apiKey = process.env.NEXT_PUBLIC_SLUGFEAST_API_KEY ?? null;

        if (!this.serverAddress) {
            return;
        }

        this.connect();
    }

    private connect() {
        if (!this.serverAddress) {
            return;
        }

        const currentState = this.client?.readyState;

        if (currentState === WebSocket.OPEN || currentState === WebSocket.CONNECTING) {
            return;
        }

        this.client = this.apiKey
            ? new WebSocket(this.serverAddress, [this.apiKey])
            : new WebSocket(this.serverAddress);
        this.init_handlers();
    }

    private scheduleReconnect() {
        if (this.hasScheduledReconnect || !this.serverAddress) {
            return;
        }

        this.hasScheduledReconnect = true;
        this.reconnectTimeoutId = setTimeout(() => {
            this.hasScheduledReconnect = false;
            this.connect();
        }, 1000);
    }

    sendMessage(message: OutgoingMessagePayload){
        if (!this.client || this.client.readyState === WebSocket.CLOSED) {
            this.connect();
        }

        if(this.client?.readyState == WebSocket.OPEN){
            this.client.send(JSON.stringify(message));
            return true;
        }

        this.updateError(new Error("WebSocket not ready"));
        return false;
    }


    private  init_handlers(){
        if(!this.client){
            console.log("Socket not initialized");
            return;
        }

        this.client.addEventListener("open", () => {
            if (this.reconnectTimeoutId) {
                clearTimeout(this.reconnectTimeoutId);
                this.reconnectTimeoutId = null;
            }
            this.hasScheduledReconnect = false;
        });
        
        this.client.addEventListener("message", (raw)=>{
            try{
            const payload = typeof raw.data === "string" ? raw.data : "";
            const data = JSON.parse(payload) as messageResponse;
            if(data.success && data.event === "message_created" && data.data){
                this.updateListeners(data.data);
                return;
            }

            if (!data.success) {
                this.updateError(new Error(data.message ?? "Message server error"));
            }
        }
        catch(e){
            this.updateError(new Error("Could not parse message server response"));
        }

        })

        this.client.addEventListener("error", () => {
            this.updateError(new Error("WebSocket connection error"));
            this.scheduleReconnect();
        });

        this.client.addEventListener("close", () => {
            this.updateError(new Error("WebSocket connection closed"));
            this.scheduleReconnect();
        });
    }

    private  updateListeners(data:StoredMessage){
        this.listeners.forEach(l=>{
            l(data);
        });
    }

    private  updateError(e:Error){
        this.errorListeners.forEach(l=>{
            l(e);
        })
    }

     addListeners(callback: (d:StoredMessage)=>void){
        this.listeners.add(callback);

        return ()=>{
            this.listeners.delete(callback);
        }
    }

     addErrorListeners(callback: (e:Error)=>void){
        this.errorListeners.add(callback);

        return ()=>{
            this.errorListeners.delete(callback);
        }
    }

}

