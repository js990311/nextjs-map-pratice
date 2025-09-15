"use client"

import Map, {MapHandler} from "@/components/map/map";
import {useEffect, useRef, useState} from "react";
import {LatLng} from "@/types/latlng";

export default function MapPickPage(){
    const mapRef = useRef<MapHandler>(null);
    const [center, setCenter] = useState<LatLng>({lat:37.564, lng:127.002});

    useEffect(() => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{setCenter({
                lat: position.coords.latitude, lng: position.coords.longitude
            });
        },
                ()=>{console.log("geolocation is not supported")});
        }
    }, []);

    useEffect(() => {
        moveCenter();
    }, [center]);

    const moveCenter = () => {
        mapRef.current?.setCenter(center);
    }

    return (
        <div >
            <Map ref={mapRef}
                className={"w-[1920px] h-[500px]"}
                 onMapClick={(position: LatLng) => {
                     console.log(`[pick] lat : ${position.lat} / lng : ${position.lng}`);
                 }}
            ></Map>
            <div>
                <button onClick={() => moveCenter()}>
                    중심지점으로 가기
                </button>
            </div>
        </div>
    )
}