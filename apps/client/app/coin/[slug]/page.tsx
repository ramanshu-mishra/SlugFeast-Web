
import { NewTokenAlert } from "./NewTokenAlert";

export default async function Page({params} : {params: Promise<{slug:string}>} ){
    const slug = await params;
    return (
        <div className="flex-1 h-full text-neutral-50">
            <NewTokenAlert />
        </div>
    )
}

















