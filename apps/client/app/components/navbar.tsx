import { SearchBar } from "./searchBar"
import { Button } from "./button"


export function Navbar(){
    return (
        <div className="flex justify-between items-center px-2 py-3 bg-neutral-900">
            <SearchBar></SearchBar>
            <Button theme="highlighted"></Button>
            <div></div>
        </div>
    )
}