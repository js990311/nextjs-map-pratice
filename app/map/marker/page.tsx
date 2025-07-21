"use client"

import Map, { MapHandler } from "@/components/map/map";
import { MarkerInfo } from "@/types/marker";
import { useEffect, useRef } from "react";

export default function MapMarker(){
    const mapRef = useRef<MapHandler>(null);

    const createMarker = () =>{
        if (mapRef.current) {
            // 테스트용 마커 정보 생성
            const markerInfos: MarkerInfo[] = [
                {
                    position: { lat: 37.5665, lng: 126.9780 }, 
                    infoContent: '<div style="padding:10px;">서울 시청</div>',
                    iconUrl: '/images/my_pin.png' 
                },
                {
                    position: { lat: 37.5796, lng: 126.9770 }, 
                    infoContent: '<div style="padding:10px;">경복궁</div>',
                    iconUrl: '/images/my_pin.png' 
                },
                {
                    position: { lat: 37.5512, lng: 126.9882 }, 
                    infoContent: '<div style="padding:10px;">남산서울타워</div>',
                    iconUrl: '/images/my_pin.png' 
                }
            ];
            mapRef.current?.drawMarkers(markerInfos);
       }
    }
    return (
        <div>   
            <Map
                ref={mapRef}
                className="w-full h-[500px]"
            ></Map>
            <button
                onClick={createMarker}
            >마커생성</button>
        </div>
    );
}