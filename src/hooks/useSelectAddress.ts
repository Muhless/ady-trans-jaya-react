import React, { useRef } from "react";
import mapboxgl from "mapbox-gl";

interface Place {
  id: string;
  place_name: string;
  geometry: {
    coordinates: [number, number];
  };
}

export const useSelectAddressHooks = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<{
    start: mapboxgl.Marker | null;
    end: mapboxgl.Marker | null;
  }>({ start: null, end: null });
  const handleSelectAddress = (
    place: Place,
    setPoint: React.Dispatch<
      React.SetStateAction<{ lng: number; lat: number } | null>
    >,
    setAddress: React.Dispatch<React.SetStateAction<string>>,
    setSuggestions: React.Dispatch<React.SetStateAction<Place[]>>,
    type: "start" | "end"
  ) => {
    const coordinates = {
      lng: place.geometry.coordinates[0],
      lat: place.geometry.coordinates[1],
    };
    setPoint(coordinates);
    setAddress(place.place_name);
    setSuggestions([]);

    if (markerRef.current[type]) markerRef.current[type]!.remove();
    const markerColor = type === "start" ? "#0ebdf6" : "#ffa7a7";
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<div style="
                          background-color: ${markerColor};
                          color: white;
                          padding: 8px 12px;
                          border-radius: 8px;
                          font-size: 14px;
                          font-weight: bold;
                          text-align: center;
                          box-shadow: 0px 4px 8px rgba(0,0,0,0.3);
                          border: 2px solid white;
                          letter-spacing: 0.5px;
                          min-width: 100px;
                      ">
                          ${type === "start" ? "🚀 Keberangkatan" : "📍 Tujuan"}
                      </div>`
    );

    markerRef.current[type] = new mapboxgl.Marker()
      .setLngLat([coordinates.lng, coordinates.lat])
      .setPopup(popup)
      .addTo(mapRef.current!);

    markerRef.current[type]!.togglePopup();

    mapRef.current!.flyTo({
      center: [coordinates.lng, coordinates.lat],
      zoom: 14,
    });
  };
  return { handleSelectAddress, markerRef, mapRef };
};
