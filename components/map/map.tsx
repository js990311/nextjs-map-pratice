"use client"

import Script from "next/script";
import { useRef, useState } from "react";

type MapProps = {
    className ?: string;
};

export default function Map({className} : Readonly<MapProps>){
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [mapState, setMapState] = useState<naver.maps.Map | null>(null);

    const createNaverMap = () => {
        if(!mapRef.current || !window.naver) return;
        // map 객체가 null이면 만들기
        const {naver} = window;

        let map: naver.maps.Map = new naver.maps.Map(mapRef.current);
        setMapState(map);
    }

    return (
        <div>
            <Script
                strategy="afterInteractive"
                src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=drawing`}
                onReady={() => {
                    createNaverMap();
                }}
            />
            <div id="map" className={className} ref={mapRef}>
            </div>

        </div>
    )
}