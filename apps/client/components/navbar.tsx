import { SearchBar } from "./searchBar"
import { Button } from "./button"
import { WalletConnect } from "./walletConnect"
import Create from "./createButton"

export function Navbar(){
    return (
        <div className="flex justify-between items-center px-12 py-3 bg-neutral-950 ">
            <SearchBar></SearchBar>
            <div className="flex gap-5 items-center justify-center">
                <Create className="bg-emerald-400 "></Create>
                 <WalletConnect></WalletConnect>
            </div>
           
        </div>
    )
}