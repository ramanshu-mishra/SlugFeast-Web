import { ConnectButton } from "@rainbow-me/rainbowkit";
export function WalletConnect(){
    return (
        <div className="mx-2">
        <ConnectButton label="Sign In" chainStatus="name" showBalance={false}></ConnectButton>
        </div>
    )
}