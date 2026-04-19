"use client";

import {PrivyProvider} from '@privy-io/react-auth';
import SlugFeastLogo from "../public/logo2.png";

export default function PrivyProviderComponent({children}: {children: React.ReactNode}) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID as string}
      config={{
        // Embedded wallets for users without existing wallets
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'users-without-wallets',
          },
        },
        // Auth methods: Email, Google OAuth, Twitter OAuth
        loginMethods: [
          'wallet',
          'email',
          'google',
          'twitter'
        ],
        walletConnectCloudProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
        externalWallets: {
          walletConnect: {
            enabled: true,
          },
        },
        // Appearance customization
        appearance: {
          logo: SlugFeastLogo.src,
          landingHeader: "Welcome to SlugFeast",
          loginMessage: "Connect or Create Wallet",
          theme: "dark",
          accentColor: "#10b981", // Emerald accent
          walletList: [
            "detected_ethereum_wallets",
            "rainbow",
            "coinbase_wallet",
            'rabby_wallet',
            'zerion',
            'backpack',
            "wallet_connect_qr",
            "wallet_connect"
          ],
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}