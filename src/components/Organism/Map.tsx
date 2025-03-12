import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibXVobGVzcyIsImEiOiJjbTZtZGM1eXUwaHQ5MmtwdngzaDFnaWxnIn0.jH96XLB-3WDcrw9OKC95-A";
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

// Tipe untuk data dari Mapbox API
interface Place {
  id: string;
  place_name: string;
  geometry: {
    coordinates: [number, number];
  };
}

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

const MapPages: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<{
    start: mapboxgl.Marker | null;
    end: mapboxgl.Marker | null;
  }>({ start: null, end: null });

  const [startPoint, setStartPoint] = useState<{ lng: number; lat: number } | null>(null);
  const [endPoint, setEndPoint] = useState<{ lng: number; lat: number } | null>(null);
  const [route, setRoute] = useState<GeoJSON.LineString | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [address, setAddress] = useState<string>("");
  const [endAddress, setEndAddress] = useState<string>("");
  const [startSuggestions, setStartSuggestions] = useState<Place[]>([]);
  const [endSuggestions, setEndSuggestions] = useState<Place[]>([]);

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [106.8456, -6.2088], // Jakarta sebagai default
        zoom: 12,
      });
    }
  }, []);

  const fetchRoute = async () => {
    if (!startPoint || !endPoint) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${startPoint.lng},${startPoint.lat};${endPoint.lng},${endPoint.lat}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();

      if (data.routes.length > 0) {
        const newRoute: GeoJSON.LineString = data.routes[0].geometry;
        setRoute(newRoute);
        setDistance(parseFloat((data.routes[0].distance / 1000).toFixed(2))); // dalam km
        setDuration(Math.ceil(data.routes[0].duration / 60)); // dalam menit

        const map = mapRef.current!;
        if (map.getSource("route")) {
          (map.getSource("route") as mapboxgl.GeoJSONSource).setData({
            type: "Feature",
            properties: {},
            geometry: newRoute,
          });
        } else {
          map.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: newRoute,
            },
          });

          map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: { "line-color": "#1E90FF", "line-width": 5 },
          });
        }
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  const handleSelectAddress = (
    place: Place,
    setPoint: React.Dispatch<React.SetStateAction<{ lng: number; lat: number } | null>>,
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

  useEffect(() => {
    if (startPoint && endPoint) {
      fetchRoute();
    }
  }, [startPoint, endPoint]);

  const clearMap = () => {
    setStartPoint(null);
    setEndPoint(null);
    setRoute(null);
    setDistance(null);
    setDuration(null);
    setAddress("");
    setEndAddress("");

    if (markerRef.current.start) markerRef.current.start.remove();
    if (markerRef.current.end) markerRef.current.end.remove();

    if (mapRef.current?.getSource("route")) {
      mapRef.current.removeLayer("route");
      mapRef.current.removeSource("route");
    }
  };

  return (
    <>
      <div className="flex container mx-auto items-center">
        <div
          ref={mapContainerRef}
          style={{
            height: "680px",
            width: "100%",
            borderRadius: "30px",
            zIndex: "0",
          }}
        />
        <div className="fixed z-10 left-1/2 bottom-16 shadow-lg bg-white p-5 rounded-2xl flex flex-col items-center">
          <input
            type="text"
            placeholder="Masukkan Alamat Awal"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              fetchAddressSuggestions(e.target.value, setStartSuggestions);
            }}
            className="p-2 border rounded mt-2 w-full"
          />
          <ul className="bg-white border rounded w-full mt-1">
            {startSuggestions.map((place) => (
              <li
                key={place.id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() =>
                  handleSelectAddress(place, setStartPoint, setAddress, setStartSuggestions, "start")
                }
              >
                {place.place_name}
              </li>
            ))}
          </ul>

          <button onClick={clearMap} className="p-2 w-full bg-red-500 text-white rounded mt-4">
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default MapPages;