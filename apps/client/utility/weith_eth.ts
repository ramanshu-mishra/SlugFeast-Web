export function WeithToEth(weith:string){
    return Number(BigInt(weith)/BigInt(10**18)).toFixed(3);
}