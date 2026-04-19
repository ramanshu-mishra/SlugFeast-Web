"use client"
import { WagmiProvider } from 'wagmi'
import { config } from '../config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import '@rainbow-me/rainbowkit/styles.css';
import { darkTheme, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Home } from '../pages/home';
import PrivyProviderComponent from './privyProvider';



const queryClient = new QueryClient()



function Provider({children}: {children: React.ReactNode}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* <RainbowKitProvider modalSize='compact' theme={lightTheme({
          overlayBlur: "small",
          accentColor: '#A8D8B9',
        accentColorForeground: "var(--color-neutral-900)",
        })}> */}
          <PrivyProviderComponent>
                <Home>
                  {children}
                </Home>
          </PrivyProviderComponent>
           
        {/* </RainbowKitProvider> */}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export {Provider};