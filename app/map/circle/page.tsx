"use client"

import Map from "@/components/map/map";
import { useEffect, useRef, useState } from "react";

export default function MapCircle(){
    const mapRef = useRef(null);
    const [radius, setRadius] = useState<number>(10_000 );
    const [strokeColor, setStrokeColor] = useState<string>('#ffffff');
    const [fillColor, setFillColor] = useState<string>('#ffffff');

    useEffect(
        ()=>{
            if(!mapRef.current){
                return;
            }
            mapRef.current?.changeRadius(radius);
        }
    , [radius]);

    return (
        <div>   
            <Map
                ref={mapRef}
                className="w-full h-[500px]"
            ></Map>
            <div>
                <div>
                    <input type="number" 
                        value={radius}
                        onChange={(e)=>{setRadius(parseInt(e.target.value));}}
                    />
                    <label htmlFor="stroke">테두리색</label>
                    <input 
                        id="stroke"
                        type="color" 
                        value={strokeColor}
                        onChange={(e)=>{setStrokeColor(e.target.value);}}
                    />
                    <label htmlFor="fill">채움색</label>
                    <input 
                        id="fill"
                        type="color" 
                        value={fillColor}
                        onChange={(e)=>{setFillColor(e.target.value);}}
                    />

                </div>
                <button
                    onClick={()=>{
                        mapRef.current?.drawCircle({
                            lat: "35.13",
                            lng: "129.05"
                        }, radius, strokeColor, fillColor);
                    }}
                >
                    부산에 그리기
                </button>
                <button
                    onClick={()=>{
                        mapRef.current?.drawCircle({
                            lat: "36.35",
                            lng: "127.38"
                        }, radius, strokeColor, fillColor);
                    }}
                >
                    대전에 그리기
                </button>
            </div>
        </div>
    );
}