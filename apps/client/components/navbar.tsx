import { SearchBar } from "./searchBar"

import { WalletConnect } from "./walletConnect"
import Create from "./createButton"
import { UserProfileIcon } from "./userProfileIcon"

import { useGetWalletInfo } from "../hooks/useGetWalletInfo"



export function Navbar(){
    const {isConnected} = useGetWalletInfo();
    
    return (
        <div className="flex justify-between items-center px-12 py-3 bg-neutral-950 ">
            <SearchBar></SearchBar>
            <div className="flex gap-5 items-center justify-center">
                <Create className="bg-emerald-400 "></Create>
                 <WalletConnect></WalletConnect>
                 { isConnected && <UserProfileIcon/>}
            </div>
            
           
        </div>
    )
}


