"use client"

import Script from "next/script";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

type MapHandler = {
    setCenter : (center: {lat: number, lng: number}) => void;
}

type MapProps = {
    className ?: string
};

const Map = forwardRef<MapHandler, MapProps>(
    function Map({className} : Readonly<MapProps>, ref){
        const mapRef = useRef<HTMLDivElement | null>(null);
        const [mapState, setMapState] = useState<naver.maps.Map | null>(null);

        /** 상위컴포넌트에서 사용할 메서드 제공 */
        useImperativeHandle(ref, () => ({
            setCenter: (center)=>{
                mapState.setCenter(center);
            }
        }), [mapState]);

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
        );
    }
);

export default Map;