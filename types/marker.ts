import { LatLng } from "./latlng";

export type MarkerInfo = {
    position: LatLng;
    iconUrl : string;
    infoContent ?: string;
};