import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import icon from "./constants";

export default function LeafletControlGeocoder() {
    const map = useMap();
    const arr = [];
    useEffect(() => {
        const geocoder = L.Control.Geocoder.nominatim();

        L.Control.geocoder({
            query: "",
            placeholder: "Search here...",
            defaultMarkGeocode: false,
            geocoder
        })
            .on("markgeocode", function (e) {
                const latlng = e.geocode.center;
                arr.push({ lat: latlng.lat, lng: latlng.lng });
                L.marker(latlng, { icon })
                    .addTo(map)
                    .bindPopup(e.geocode.name)
                    .openPopup();
                map.fitBounds(e.geocode.bbox);
            })
            .addTo(map);
    }, []);

    return null;
}
