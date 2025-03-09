import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";

// Definisi interface Place untuk menyimpan hasil pencarian alamat
interface Place {
  id: string;
  place_name: string;
  geometry: {
    coordinates: [number, number];
  };
}

interface MapPagesProps {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  endAddress: string;
  setEndAddress: React.Dispatch<React.SetStateAction<string>>;
  setStartPoint: React.Dispatch<
    React.SetStateAction<{ lng: number; lat: number } | null>
  >;
  setEndPoint: React.Dispatch<
    React.SetStateAction<{ lng: number; lat: number } | null>
  >;
}

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibXVobGVzcyIsImEiOiJjbTZtZGM1eXUwaHQ5MmtwdngzaDFnaWxnIn0.jH96XLB-3WDcrw9OKC95-A";
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const fetchAddressSuggestions = async (
  query: string,
  setSuggestions: React.Dispatch<React.SetStateAction<Place[]>>
) => {
  if (!query) {
    setSuggestions([]);
    return;
  }

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?autocomplete=true&access_token=${MAPBOX_ACCESS_TOKEN}`
    );
    const data = await response.json();
    if (data.features) {
      setSuggestions(data.features);
    }
  } catch (error) {
    console.error("Error fetching address suggestions:", error);
  }
};

const MapPages: React.FC<MapPagesProps> = ({
  address,
  setAddress,
  endAddress,
  setEndAddress,
  setStartPoint,
  setEndPoint,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<{
    start: mapboxgl.Marker | null;
    end: mapboxgl.Marker | null;
  }>({ start: null, end: null });

  const [startSuggestions, setStartSuggestions] = useState<Place[]>([]);
  const [endSuggestions, setEndSuggestions] = useState<Place[]>([]);

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [106.8456, -6.2088],
        zoom: 12,
      });
    }
  }, []);

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
    markerRef.current[type] = new mapboxgl.Marker()
      .setLngLat([coordinates.lng, coordinates.lat])
      .addTo(mapRef.current!);
    mapRef.current!.flyTo({
      center: [coordinates.lng, coordinates.lat],
      zoom: 14,
    });
  };

  return (
    <div className="relative">
      <div ref={mapContainerRef} className="h-[500px] w-full rounded-lg" />
      <div className="absolute left-1/2 bottom-16 transform -translate-x-1/2 bg-white p-5 rounded-xl shadow-lg">
        <input
          type="text"
          placeholder="Masukkan Alamat Awal"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            fetchAddressSuggestions(e.target.value, setStartSuggestions);
          }}
          className="p-2 border rounded w-full"
        />
        <ul className="bg-white border rounded w-full mt-1">
          {startSuggestions.map((place) => (
            <li
              key={place.id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() =>
                handleSelectAddress(
                  place,
                  setStartPoint,
                  setAddress,
                  setStartSuggestions,
                  "start"
                )
              }
            >
              {place.place_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapPages;
