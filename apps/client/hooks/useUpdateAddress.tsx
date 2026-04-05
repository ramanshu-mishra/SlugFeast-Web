"use client"

import { useState } from "react"




export function useUpdateAddress(ServerAddress: string){
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState<Error|null>(null);
  const [data, setData] = useState<Record<string, unknown>|null>(null);
    const [errCount, setErrCount] = useState(0);

    async function updateAddress(coinAddress: `0x${string}`, id: string){

    if(errCount >= 2){
      const cappedError = new Error("Maximum error count reached");
      setError(cappedError);
      return null;
    }

        setLoading(true);
        setError(null);

      try{
        let localErrCount = errCount;

        while(localErrCount < 2){
          try{
            const response = await fetch(`${ServerAddress}/updateAddress`, {
              method: "GET",
              headers:{
                "address": coinAddress,
                "id" : id
              }
            });

            if(!response.ok){
              throw new Error(`Failed to update address: ${response.status}`);
            }

            const payload = await response.json() as Record<string, unknown>;
            setData(payload);
            setErrCount(0);
            return payload;
          }
          catch(e){
            const normalizedError = e instanceof Error ? e : new Error("something went wrong");
            localErrCount += 1;
            setErrCount(Math.min(localErrCount, 2));

            if(localErrCount >= 2){
              setError(normalizedError);
              return null;
            }
          }
        }

        return null;
      }
      finally{
        setLoading(false);
      }
    }

  return {updateLoading:loading, updatedData:data, updateError:error, updateAddress};
}