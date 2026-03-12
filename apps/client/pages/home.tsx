import { Navbar } from "../components/navbar"
import { Sidebar } from "../components/sidebar"
export function     Home({children}:{children: React.ReactNode}){
    return (
        <div className="min-h-screen min-w-screen h-screen w-screen bg-neutral-950 flex overflow-auto">
            <Sidebar></Sidebar>
            <div className="flex-1 flex flex-col h-screen m-0 p-0">
                <Navbar></Navbar>
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </div>           
        </div>
    )
}