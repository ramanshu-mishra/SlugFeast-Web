"use client"

import { useEffect, useState } from "react";

export function useWSConnection(ws:WebSocket|null|undefined){
    const [connecting, setConnecting] = useState(false);
    const [open, setOpen] = useState(false);
    const [close, setClose] = useState(false);



    useEffect(()=>{
        if(!ws)return;
        if(ws.readyState == WebSocket.CONNECTING){
            setConnecting(true);
            setOpen(false);
            setClose(false);
        }
        else if(ws.readyState == WebSocket.OPEN){
            setConnecting(false);
            setOpen(true);
            setClose(false);
        }
        else if(ws.readyState == WebSocket.CLOSED){
            setConnecting(false);
            setOpen(false);
            setClose(true);
        }
    }, [ws, ws?.readyState])


    return {connecting, open, close};
}
