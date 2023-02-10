import React from "react";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import LeafletControlGeocoder from "./leafletControlGeodecoder";
const Map = () => {
    const position = [50.592361, 36.588238];
    const center = [50.592361, 36.588238];

    const fillBlueOptions = { fillColor: "blue" };
    const fillBlueOptionsZonaOne = { fillColor: "red" };
    const fillBlueOptionsZonaTwo = { fillColor: "yellow" };
    return (
        <>
            <div className="breadcrumb__text">
                <h3>Наши магазины</h3>
                <p>г. Белгород ул.Попова, 2А (работаем с 9-17)</p>
                <p>
                    г. Белгород Народный бульвар, 74 (работаем с 10-18 пункт
                    самовывоза)
                </p>
                <p>Стоимость доставки:</p>
                <p>Зона 1 - 100 рублей</p>
                <p>Зона 2 - 120 рублей</p>
                <p>Зона 3 - 150 рублей</p>
            </div>

            <MapContainer
                center={position}
                zoom={12}
                style={{ width: "80vw", height: "65vh" }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                ></TileLayer>
                <Marker
                    position={position}
                    icon={
                        new Icon({
                            iconUrl: markerIconPng,
                            iconSize: [25, 41],
                            iconAnchor: [12, 41]
                        })
                    }
                />
                <Circle
                    center={center}
                    pathOptions={fillBlueOptions}
                    radius={400}
                />
                <Circle
                    center={center}
                    pathOptions={fillBlueOptionsZonaOne}
                    radius={800}
                />
                <Circle
                    center={center}
                    pathOptions={fillBlueOptionsZonaTwo}
                    radius={1200}
                />
                <LeafletControlGeocoder />
            </MapContainer>
        </>
    );
};
export default Map;
