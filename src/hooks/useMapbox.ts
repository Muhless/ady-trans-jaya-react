import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoibXVobGVzcyIsImEiOiJjbTZtZGM1eXUwaHQ5MmtwdngzaDFnaWxnIn0.jH96XLB-3WDcrw9OKC95-A";
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

export const useMapbox = (ref: React.RefObject<HTMLDivElement>) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<{ start: mapboxgl.Marker | null; end: mapboxgl.Marker | null }>({ start: null, end: null });

  const [startPoint, setStartPoint] = useState<{ lng: number; lat: number } | null>(null);
  const [endPoint, setEndPoint] = useState<{ lng: number; lat: number } | null>(null);

  useEffect(() => {
    if (!mapRef.current && ref.current) {
      mapRef.current = new mapboxgl.Map({
        container: ref.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [106.8456, -6.2088],
        zoom: 12,
      });
    }
  }, [ref]);

  const addMarker = (type: "start" | "end", coordinates: { lng: number; lat: number }, placeName: string) => {
    if (markerRef.current[type]) markerRef.current[type]!.remove();
    const color = type === "start" ? "#0ebdf6" : "#ffa7a7";

    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<div style="background-color: ${color}; padding: 6px; border-radius: 5px; font-size: 12px; text-align: center;">${placeName}</div>`
    );

    markerRef.current[type] = new mapboxgl.Marker().setLngLat([coordinates.lng, coordinates.lat]).setPopup(popup).addTo(mapRef.current!);
    markerRef.current[type]!.togglePopup();

    mapRef.current!.flyTo({ center: [coordinates.lng, coordinates.lat], zoom: 14 });
  };

  return { mapRef, markerRef, startPoint, setStartPoint, endPoint, setEndPoint, addMarker };
};
