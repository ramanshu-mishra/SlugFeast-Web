import { SearchBar } from "./searchBar"
import { Button } from "./button"
import { WalletConnect } from "./walletConnect"

export function Navbar(){
    return (
        <div className="flex justify-between items-center px-2 py-3 bg-neutral-950 ">
            <SearchBar></SearchBar>
            <WalletConnect></WalletConnect>
        </div>
    )
}