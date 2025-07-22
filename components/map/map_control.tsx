"use client"

import { ReactNode, useState } from "react";

type MapControlProps = { 
    children: ReactNode
}

export default function MapControl({children} : MapControlProps){
    const [isClosed, setIsClosed] = useState<boolean>(true); 
    return (
        <div>
            <div
                className={
                    `h-96 w-72 fixed top-0 left-0 transition-transform duration-300 ease-in-out bg-white z-50 ${!isClosed ? 'translate-0' : '-translate-x-full'}`
                }
            >
                <button
                    className="absolute top-4 right-0 px-2 py-4 border-2 border-white bg-amber-50 hover:cursor-pointer translate-x-full"
                    onClick={()=>setIsClosed(prev=>{return !prev;})}
                >
                    버튼
                </button>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}