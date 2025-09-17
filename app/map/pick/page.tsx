"use client"

import Map, {MapHandler} from "@/components/map/map";
import {useEffect, useRef, useState} from "react";
import {LatLng} from "@/types/latlng";

export default function MapPickPage(){
    const mapRef = useRef<MapHandler>(null);
    const [center, setCenter] = useState<LatLng>({lat:37.564, lng:127.002});
    const [clickableMap, setClickableMap] = useState<boolean>(false);

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
        mapRef.current?.drawMarkers([{
            position: center,
            iconUrl: '/images/my_pin.png'
        }]);
    }, [center]);

    const moveCenter = () => {
        mapRef.current?.setCenter(center);
    }

    const onClickMap = (position: LatLng) => {
        if(clickableMap){
            setCenter(position);
            setClickableMap(false);
        }
    }

    return (
        <div >
            <Map ref={mapRef}
                className={"w-[1920px] h-[500px]"}
                 onMapClick={onClickMap}
            ></Map>
            <div>
                <button onClick={() => moveCenter()}>
                    중심지점으로 가기
                </button>
                <button onClick={() => setClickableMap(true)}>
                    중심지점 바꾸기
                </button>
            </div>
        </div>
    )
}