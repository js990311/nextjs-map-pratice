"use client"

import Map, { MapHandler } from "@/components/map/map";
import { MarkerInfo } from "@/types/marker";
import { useEffect, useRef, useState } from "react";

export default function MapMarkerClickPage(){
    const mapRef = useRef<MapHandler>(null);
    const [focusId, setFocusId] = useState<number>(-1);

    const onMarkerClick = (markerId: number) => {
        console.log(markerId);
        setFocusId(markerId);
    };

    // 테스트용 마커 정보 생성
    const markerInfos: MarkerInfo[] = [
            {
                markerId : 1,
                position: { lat: 37.5665, lng: 126.9780 }, 
                infoContent: '<div style="padding:10px;">서울 시청</div>',
                iconUrl: '/images/my_pin.png',
                onClick: onMarkerClick
            },
            {
                markerId : 2,
                position: { lat: 37.5796, lng: 126.9770 }, 
                infoContent: '<div style="padding:10px;">경복궁</div>',
                iconUrl: '/images/my_pin.png',
                onClick: onMarkerClick
            },
            {
                markerId : 3,
                position: { lat: 37.5512, lng: 126.9882 }, 
                infoContent: '<div style="padding:10px;">남산서울타워</div>',
                iconUrl: '/images/my_pin.png',
                onClick: onMarkerClick
            }
    ];

    const createMarker = () =>{
        if (mapRef.current) {
            mapRef.current?.drawMarkers(markerInfos);
       }
    }

    const infoLi = markerInfos.map((info) => 
        (
            <li key={info.markerId} className={`${focusId === info.markerId ? "text-red-900" : "text-black"}`}>
                {info.infoContent}
            </li>
        )
    );
    


    return (
        <div>   
            <Map
                ref={mapRef}
                className="w-full h-[500px]"
            ></Map>
            <button
                onClick={createMarker}
            >마커생성</button>
            
            <ul>
                {infoLi}
            </ul>
        </div>
    );
}