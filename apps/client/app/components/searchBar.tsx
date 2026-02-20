"use client"

import { Search } from "lucide-react"
export function SearchBar(){
    return (
        <div className="h-10 w-80 bg-neutral-800 flex px-4 py-2 gap-2 text-neutral-700 rounded-md cursor-pointer">
            <Search className="h-5"></Search>
            <span>Search...</span>
        </div>
    )
}