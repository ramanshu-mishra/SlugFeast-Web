"use client"
import { LayoutGroup, motion } from "motion/react"
import { useState , memo, useEffect, SetStateAction, Dispatch} from "react";
import { Coin } from "../interfaces/coinInterface";
import useGetTokenReserves from "../hooks/useGetTokenReserves";
import { useGetTokenBalance } from "../hooks/useGetTokenBalance";
import { useAccount } from "wagmi";
import { useGetWalletBalance } from "../hooks/useGetWalletBalance";
import { cn } from "../utility/cn";
import eth_symbol from "../public/eth_symbol.png";
import { useDebounce } from "../hooks/useDebounce";
import { useBuyTokens } from "../hooks/useBuyTokens";
import { useSellTokens } from "../hooks/useSellTokens";
import { useGetNonce } from "../hooks/useGetNonce";
import { parseUnits } from "viem";


interface tradeInterface{
    value:string,
    active:boolean
}

export const TradeOptions = memo(({coin}:{coin:Coin})=> {
    const symbol = coin.symbol as string;
    const zeroAddress = "0x0000000000000000000000000000000000000000" as `0x${string}`;
    const [option, setOption] = useState<"Sell" | "Buy">("Buy");
    const [pov, setPov] = useState<"Eth" | string>("Eth");
    const { address } = useAccount();
    const [trade,setTrade] = useState<tradeInterface>({
        value: "",
        active: false
    });
    const {data:nonce, error, isPending, refetch:getNonce} = useGetNonce(address);
    const [processing, setProcessing] = useState<boolean>(false);

    const [debouncedValue, setDebouncedValue] = useDebounce(trade.value, 300);
    const {buyTokens, buyLoading, buyError, buyHash} = useBuyTokens();
    const {sellTokens, sellLoading, sellError, sellHash} = useSellTokens();
    
    
    const balance = useGetTokenBalance({
        tokenAddress: coin.address,
        accountAddress: address,
    });
   
    
    const walletAddress = (address as `0x${string}` | undefined) ?? zeroAddress;
    const {data:ethBalance} = useGetWalletBalance({address: walletAddress});
    // const ethBalance = {value: 45*10**18}


    async function _buyTokens(){
        if (!trade.active || buyLoading || sellLoading || processing || !address) return;

        const inputValue = Number(trade.value);
        if (!Number.isFinite(inputValue) || inputValue <= 0) return;

        const nonceResult = await getNonce();
        const txNonce = Number(nonceResult.data ?? nonce ?? 0);
        if (!Number.isFinite(txNonce)) return;

        setProcessing(true);
        try {
            await buyTokens({
                address: coin.address as `0x${string}`,
                nonce: txNonce,
                value: inputValue,
            });

            setTrade({ value: "", active: false });
        }
        finally {
            setProcessing(false);
        }
    }

    async function _sellTokens(){
        if (!trade.active || buyLoading || sellLoading || processing || !address) return;

        const inputValue = Number(trade.value);
        if (!Number.isFinite(inputValue) || inputValue <= 0) return;

        const nonceResult = await getNonce();
        const txNonce = Number(nonceResult.data ?? nonce ?? 0);
        if (!Number.isFinite(txNonce)) return;

        let tokenAmount: bigint;
        try {
            tokenAmount = parseUnits(trade.value, 6);
        } catch {
            return;
        }
        if (tokenAmount <= 0n) return;

        setProcessing(true);
        try {
            await sellTokens({
                address: coin.address as `0x${string}`,
                amount: tokenAmount,
                nonce: txNonce,
            });

            setTrade({ value: "", active: false });
        }
        finally {
            setProcessing(false);
        }
    }

    return (
        <div className="select-none flex  h-fit flex-col gap-2 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
            <div className="w-full">
                <LayoutGroup id="trade-option-tabs">
                    <div className="relative grid grid-cols-2 rounded-lg border border-neutral-700 bg-neutral-800/60 p-1">
                        {(["Buy", "Sell"] as const).map((tab) => {
                            const isActive = option === tab;

                            return (
                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() => setOption(tab)}
                                    className="relative z-10 h-10 rounded-md text-base font-medium cursor-pointer"
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-trade-tab"
                                            className={` absolute inset-0 rounded-md transition-colors duration-300 text-neutral-50 ${tab === "Buy" ? "bg-emerald-600 text-neutral-900" : "bg-red-500 text-neutral-900"}`}
                                            transition={{
                                                layout: { duration: 0.28, ease: "easeInOut" },
                                                duration: 0.28,
                                            }}
                                        />
                                    )}

                                    <span className={` font-bold relative z-20 transition-colors duration-200 ${isActive ? "text-neutral-950" : "text-neutral-300"}`}>
                                        {tab}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </LayoutGroup>
            </div>
                <div className="flex items-center gap-2 px-2">
                                { option == "Buy" && <motion.span whileHover={{backgroundColor: "--var(neutral-900)"}} className="text-sm px-2 rounded-md border border-neutral-700 bg-neutral-800 cursor-pointer"
                        onClick={()=>{
                           setPov(e=>e=="Eth"?symbol:"Eth");
                        }}
                        >switch to {pov=="Eth"?symbol:"Eth"}</motion.span>}
                                <motion.span whileHover={{backgroundColor: "--var(neutral-900)"}} className="text-sm px-2 rounded-md border border-neutral-700 bg-neutral-800 cursor-pointer ml-auto">Slippage</motion.span>
            </div>
            <div className="flex justify-between px-2">
                        <span>Balance</span>
                        {option=="Buy" && <span>{pov=="Eth" ? `${((Number(ethBalance?.value ?? 0))/Number(10**18)).toFixed(5)} ETH` : balance?  balance.data ? `${((Number(balance.data)/10**6).toFixed(5)).toString()} ${symbol.trim().slice(0,6)}${symbol.length > 6 ? "..." : ""}` : `0 ${symbol.trim().slice(0,6)}${symbol.length > 6 ? "..." : ""}` : `0 ${symbol.trim().slice(0,6)}${symbol.length > 6 ? "..." : ""}`}</span>}
                        {
                            option == "Sell" && 
                            <span>{`${((Number(balance?.data)/10**6).toFixed(5)).toString()} ${symbol.trim().slice(0,6)}${symbol.length > 6 ? "..." : ""}` }</span>
                        }
            </div>
            <div className="relative">
                <input
                    type="text"
                    step="any"
                    value={trade.value}
                    placeholder="0.00"
                    className="w-full h-10 rounded-xl bg-neutral-700 px-2"
                    onChange={(e)=>setTrade(tr=>({...tr, value : e.target.value}))}
                />
                <TokenLogo symbol={option == "Sell" ? symbol : pov == "Eth" ? "Eth" : symbol} coin={coin} className="absolute right-5 top-1" />
            </div>
            <Quote value={Number(trade.value)} coin={coin} symbol={symbol} pov={pov} option={option} setTrade={setTrade} balance={Number(ethBalance?.value ?? 0) / 10**18} tokenBalance={Number(balance?.data ?? 0)} walletAddress={walletAddress} ></Quote>
            <div
                onClick={option === "Buy" ? _buyTokens : _sellTokens}
                className={cn("flex justify-center items-center w-full h-10 rounded-xl text-neutral-800 font-bold border border-neutral-900", option=="Buy"? trade.active ? "bg-emerald-400 cursor-pointer" : "bg-emerald-800 cursor-not-allowed" : trade.active ? "bg-red-400 cursor-pointer" : "bg-red-900 cursor-not-allowed")}
            >
                {(buyLoading || processing) || (sellLoading || processing) ? "Processing..." : `${option} ${coin.symbol.slice(0,1).toUpperCase()+coin.symbol.slice(1).toLocaleLowerCase()}`}
            </div>
            
        </div>
    );
})





const TokenLogo = memo(({ symbol, coin, className }: { symbol: string; coin?: Coin; className?: string }) =>{
    const displaySymbol = symbol === "Eth" ? "ETH" : (coin?.symbol || symbol).toUpperCase();

    if (symbol === "Eth" || coin?.imageUrl) {
        const imageSrc = symbol === "Eth" ? eth_symbol.src : coin?.imageUrl;

        return (
            <div className={cn("flex items-center gap-2", className)}>
                <span className="text-xs font-semibold text-neutral-200">
                    {displaySymbol.length > 8 ? `${displaySymbol.slice(0, 8)}…` : displaySymbol}
                </span>
                <img
                    className="h-8 w-8 rounded-full object-cover border border-neutral-50"
                    src={imageSrc}
                    alt={displaySymbol}
                />
            </div>
        );
    }

    return (
        <span className={cn("rounded-md bg-neutral-800 px-2 py-1 text-xs font-semibold text-neutral-200", className)}>
            {symbol.length > 8 ? `${symbol.slice(0, 8)}…` : symbol}
        </span>
    );
})



interface priceInterface{
    token_in_eth: number,
    eth_in_token: number
}

interface AllowTradeInterface{
    allowBuy: boolean,
    allowSell: boolean,
    buyMessage: string,
    sellMessage: string
}

const Quote = memo(({value, coin, symbol,pov, option, setTrade, balance, tokenBalance, walletAddress}:{value:number, coin:Coin, symbol:string,pov:"Eth"|string ,option:"Sell" | "Buy", setTrade : Dispatch<SetStateAction<tradeInterface>>, balance: number, tokenBalance: number, walletAddress: `0x${string}`})=>{
    const {data,isLoading, error} = useGetTokenReserves({key: coin.address as `0x${string}`, address: walletAddress});
    const [price,setPrice] = useState<priceInterface>({
        token_in_eth: 0,
        eth_in_token:0
    });
   
    const [allowTrade, setAllowTrade] = useState<AllowTradeInterface>({
        allowBuy: false,
        allowSell: false,
        buyMessage: "",
        sellMessage: ""
    });
    
   
    

    useEffect(()=>{
        if (!value || Number.isNaN(value)) {
            setAllowTrade({
                allowBuy: false,
                allowSell: false,
                buyMessage: "",
                sellMessage: ""
            });
            setTrade((t) => ({ ...t, active: false }));
            return;
        }

        const tokenReserveResult = data?.[0];
        const vEthReserveResult = data?.[1];

        if (!tokenReserveResult || !vEthReserveResult) return;
        if (tokenReserveResult.status !== "success" || vEthReserveResult.status !== "success") return;

        const tokenReserve = Number(tokenReserveResult.result ?? 0);
        const vEthReserve = Number(vEthReserveResult.result ?? 0);
        if (tokenReserve === 0 || vEthReserve === 0) return;

        const token_in_eth =  ((tokenReserve/vEthReserve)*value*10**18)/10**6;
        const eth_in_token =  (vEthReserve/tokenReserve*value*10**6)/10**18;
        
        //assuming contract never sends that we have 0 tokens remaining, because ideally in that case contract should contact with the uniswap dex or frontend should contact with the uniswap dex to perform all these trade related activities. Well its better if client directly does it to avoid gas fees. 

        

        const nextAllowTrade: AllowTradeInterface = 
        {
            allowBuy: false,
            allowSell: false,
            buyMessage: "",
            sellMessage: ""
        };

        if (option === "Buy") {
            const requiredEth = pov === "Eth" ? value : eth_in_token;

            if (requiredEth < 0.005) {
                nextAllowTrade.buyMessage = "Minimum Buy order: 0.005 Eth";
            } else if (balance < requiredEth) {
                nextAllowTrade.buyMessage = `Insufficient Eth. You have ${balance.toFixed(5)} Eth`;
            } 
            else if(pov == "Eth" && value > vEthReserve ){
                nextAllowTrade.buyMessage = `Max Buy limit : ${eth_in_token}`
            }
            else {
                nextAllowTrade.allowBuy = true;
            }
        } else {
            const requiredToken =  value*10**6;
            const availableToken = tokenBalance;

   
            if(requiredToken.toString().includes(".")){
                nextAllowTrade.sellMessage = "Max decimal points digits can be 6";
                nextAllowTrade.allowSell = false
            }
            else if (availableToken < requiredToken) {
                nextAllowTrade.sellMessage = `Insufficient Coins. You have ${availableToken.toFixed(5)} coins`;
                nextAllowTrade.allowSell = false;
            } else {
                nextAllowTrade.allowSell = true;
            }
        }

        setAllowTrade(nextAllowTrade);

        setPrice({
            token_in_eth,
            eth_in_token
        });

        setTrade(t=>({
            ...t, active: option == "Buy" ? nextAllowTrade.allowBuy : nextAllowTrade.allowSell
        }));

    }, [value, data, option, pov, balance, tokenBalance, setTrade]);
    
    if(!value){
        return <div></div>
    }
    return (
        
        <div className="w-full">
            {
                option == "Buy" && !allowTrade.allowBuy && 
                <div className="text-red-800">
                    {allowTrade.buyMessage}
                </div>
            }
            {
                option == "Sell" && !allowTrade.allowSell && 
                <div className="text-red-800">
                    {allowTrade.sellMessage}
                </div>
            }
            {option == "Buy" &&  pov=="Eth" && 
                <div>
                    You get: {price.token_in_eth} {symbol.toUpperCase()}
                </div>
            }
            {
                option == "Buy" && pov != "Eth" && 
                <div>
                    You pay: {price.eth_in_token} Eth
                </div>
            }
            {
                option == "Sell"  && 
                <div>
                    You recieve: {price.eth_in_token} Eth
                </div>
            }
        </div>
    )
})