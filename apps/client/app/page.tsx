"use client"
import { WagmiProvider } from 'wagmi'
import { config } from './config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';


import CreateToken from "./createToken";

const queryClient = new QueryClient()

function WalletOptions() {

  return (
    <>
      <ConnectButton></ConnectButton>
    </>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <WalletOptions></WalletOptions>
            <CreateToken></CreateToken>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;