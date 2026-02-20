import { Navbar } from "../components/navbar"
import { Sidebar } from "../components/sidebar"
export function Home(){
    return (
        <div className="min-h-screen min-w-screen bg-neutral-900 flex">
            <Sidebar></Sidebar>
            <div className="flex-1">
                <Navbar></Navbar>
            </div>           
        </div>
    )
}