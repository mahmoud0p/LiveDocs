import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

export const Header = ({children , className} : {children: ReactNode ,className: string})=>{
    return (
        <div className={cn (" flex flex-row  bg-slate-900 w-full p-4 rounded-xl shadow items-center  gap-3", className)}>
                <Link href="/" className="md:flex-1 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 fill-[#EEEE]" viewBox="0 0 48 48" id="Layer_2" data-name="Layer 2"><defs></defs><path className="cls-1" d="M10.35,4.5a2,2,0,0,0-1.95,2v35.1a2,2,0,0,0,1.95,2h27.3a2,2,0,0,0,2-2V14.49h-8a2,2,0,0,1-1.95-2v-8Z"/><line className="cls-1" x1="29.61" y1="4.5" x2="39.6" y2="14.49"/><line className="cls-1" x1="15.84" y1="22.97" x2="32.16" y2="22.97"/><line className="cls-1" x1="15.84" y1="35.07" x2="32.16" y2="35.07"/><line className="cls-1" x1="15.84" y1="29.02" x2="32.16" y2="29.02"/></svg>
                <h1 className=" text-xl md:block hidden ">Documents</h1>
            </Link>
            {children}
        </div>
    )
}