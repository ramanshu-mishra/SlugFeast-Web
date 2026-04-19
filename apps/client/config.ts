import { sepolia } from 'wagmi/chains'
import { http, injected} from "wagmi"; 
import {createConfig} from "@privy-io/wagmi"
import { metaMask } from 'wagmi/connectors';
import { injectedWallet, metaMaskWallet, phantomWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';




export const config = createConfig({
    chains: [sepolia],
    transports: {
        [sepolia.id]: http()
    },
    ssr: true,
});




