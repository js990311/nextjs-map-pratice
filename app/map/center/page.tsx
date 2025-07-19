"use client"

import Map from "@/components/map/map";
import { forwardRef, useRef } from "react";

export default function MapCenter(){
    const mapRef = useRef(null);

    return (
        <div>   
            <Map
                ref={mapRef}
                className="w-full h-[500px]"
            ></Map>
            <div>
            <button
                onClick={()=>{
                    mapRef.current?.setCenter({
                        lat: "35.13",
                        lng: "129.05"
                    });
                }}
            >
                부산
            </button>
            <button
                onClick={()=>{
                    mapRef.current?.setCenter({
                        lat: "36.35",
                        lng: "127.38"
                    });
                }}
            >
                대전
            </button>

            </div>
        </div>
    );
}