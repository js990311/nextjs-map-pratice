"use client"

import Map, { MapHandler } from "@/components/map/map"
import MapControl from "@/components/map/map_control";
import { useRef, useState } from "react"

export default function ControlMapPage(){
    const mapRef = useRef<MapHandler>(null);

    return (
        <div>
            <div id="map-and-control">
                <MapControl>
                    <div>
                        <h1>컨트롤룸</h1>
                        <button
                            onClick={()=>{
                                mapRef.current?.setCenter({
                                    lat: 35.13,
                                    lng: 129.05
                                });
                            }}
                        >
                            부산
                        </button>
                        <button
                            onClick={()=>{
                                mapRef.current?.setCenter({
                                    lat: 36.35,
                                    lng: 127.38
                                });
                            }}
                        >
                            대전
                        </button>
                    </div>
                </MapControl>
                <Map
                    ref={mapRef}
                    className="w-full h-[500px]"
                ></Map>
            </div>
        </div>
    )
}