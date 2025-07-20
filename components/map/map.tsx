"use client"

import { LatLng } from "@/types/latlng";
import Script from "next/script";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

type MapHandler = {
    setCenter : (center: LatLng) => void;
    drawCircle : (center: LatLng, radius: number, strokeColor: string, fillColor: string) => void;
    changeRadius : (radius: number) => void;
}

type MapProps = {
    className ?: string
};

const Map = forwardRef<MapHandler, MapProps>(
    function Map({className} : Readonly<MapProps>, ref){
        const mapRef = useRef<HTMLDivElement | null>(null);
        const [mapState, setMapState] = useState<naver.maps.Map | null>(null);
        const circle = useRef<naver.maps.Circle | null>(null);

        /** 상위컴포넌트에서 사용할 메서드 제공 */
        useImperativeHandle(ref, () => ({
            setCenter: (center)=>{
                mapState?.setCenter(center);
            },
            drawCircle: (center, radius, strokeColor, fillColor) => {
                if(!center || !radius){
                    return;
                }
                if(circle.current){
                    circle.current.setMap(null);
                }
                circle.current = new naver.maps.Circle({
                    strokeColor: strokeColor,
                    strokeOpacity: 0.9,
                    strokeWeight: 2,
                    fillColor: fillColor,
                    fillOpacity: 0.1,
                    center: center, // 원의 중심 좌표
                    radius: radius,                                         // 원의 반경 (미터 단위)
                    zIndex: 100,
                    clickable: false,
                    map: mapState
                });
            },
            changeRadius : (radius) => {
                if(!radius){
                    return;
                }
                if(circle.current){
                    circle.current.setRadius(radius);
                }
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