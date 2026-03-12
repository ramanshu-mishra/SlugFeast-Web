import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia } from 'wagmi/chains'
import {http, injected} from "wagmi"; 
import { metaMask } from 'wagmi/connectors';
import { injectedWallet, metaMaskWallet, phantomWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';




export const config = getDefaultConfig({
    appName: 'SlugFeast',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    chains: [sepolia],
    transports: {
        [sepolia.id]: http()
    },
    wallets: [
        {
            groupName: "Installed",
            wallets: [injectedWallet]
        },
        {
            groupName: "Recommended",
            wallets: [metaMaskWallet, phantomWallet, walletConnectWallet]
        }
    ],
    ssr: true,
});




