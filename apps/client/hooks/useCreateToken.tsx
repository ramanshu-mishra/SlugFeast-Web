"use client"
import { useState } from "react";


interface Socials{
    instagram?: string,
    youtube?: string,
    x?: string,
    telegram?: string,
    website?: string
}

interface userInterface{
    name?: string,
    email?: string,
    countryCode?: string,
    contact?: string
}

interface tokenInterface{
    tokenName: string,
    symbol:string,
    socials: Socials,
    description?: string,
    imageUrl: string,
}

interface combinedInterface extends userInterface, tokenInterface{}



export function useCreateToken(){
   
    const [data, setData] = useState<any|null>();
    const [loading,setLoading] = useState<boolean|null>();
    const [error, setError ] = useState<Error|null>();
    
    async function createToken(parameters: combinedInterface, nonce: number, publicKey: `0x${string}` ){
        setData(null);
        setError(null);
        setLoading(true);
        try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/createToken`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "nonce": String(nonce),
                "publicKey": publicKey
            },
            body: JSON.stringify({
                ...parameters
            })
        });
        const data = await res.json();
        setData(data);
        return data;
    }
    catch(e){
        e instanceof Error ? setError(e) : setError(new Error("something went wrong"));
    }
    finally{
        setLoading(false);
    }
   }

   return {
       data, loading, error, createToken
   }
}