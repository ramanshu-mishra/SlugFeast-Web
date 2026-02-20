import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia } from 'wagmi/chains'
import {http, createConfig} from "wagmi"; 
import { metaMaskWallet, injectedWallet } from '@rainbow-me/rainbowkit/wallets'



export const config = createConfig({
    chains: [sepolia],
     transports:{
        [sepolia.id]: http()
    }
});




