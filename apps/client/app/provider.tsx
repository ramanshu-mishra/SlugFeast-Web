"use client"
import { WagmiProvider } from '@privy-io/wagmi'
import { config } from '../config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import '@rainbow-me/rainbowkit/styles.css';
import { darkTheme, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Home } from '../webPages/home';
import PrivyProviderComponent from './privyProvider';



const queryClient = new QueryClient()



function Provider({children}: {children: React.ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
    <PrivyProviderComponent>
      <WagmiProvider config={config}>
        
          {/* <RainbowKitProvider modalSize='compact' theme={lightTheme({
            overlayBlur: "small",
            accentColor: '#A8D8B9',
          accentColorForeground: "var(--color-neutral-900)",
          })}> */}
          <Home>
            {children}
          </Home>
          {/* </RainbowKitProvider> */}
      </WagmiProvider>
    </PrivyProviderComponent>
    </QueryClientProvider>
  );
}

export {Provider};