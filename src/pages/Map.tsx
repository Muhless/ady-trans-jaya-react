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
  startPoint: { lng: number; lat: number } | null;
  endPoint: { lng: number; lat: number } | null;
}

interface GeocodeResponse {
  features: { place_name: string }[];
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
  startPoint,
  endPoint,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const startMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const endMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const isSelectingStart = useRef<boolean>(true);

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [106.8456, -6.2088], // default
        zoom: 12,
      });

      mapRef.current.on("click", async (e) => {
        const lng = e.lngLat.lng;
        const lat = e.lngLat.lat;

        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
          );
          const data: GeocodeResponse = await response.json();
          const placeName =
            data.features.length > 0 ? data.features[0].place_name : "Lokasi tidak ditemukan";
          if (isSelectingStart.current) {
            setStartPoint({ lng, lat });
            setAddress(placeName);
          } else {
            setEndPoint({ lng, lat });
            setEndAddress(placeName);
          }
          isSelectingStart.current = !isSelectingStart.current;
        } catch (error) {
          console.error("Gagal mendapatkan alamat dari koordinat:", error);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (mapRef.current && startPoint) {
      if (!startMarkerRef.current) {
        startMarkerRef.current = new mapboxgl.Marker({ color: "sky-blue" })
          .setLngLat([startPoint.lng, startPoint.lat])
          .addTo(mapRef.current);
      } else {
        startMarkerRef.current.setLngLat([startPoint.lng, startPoint.lat]);
      }
    }
  }, [startPoint]);
  useEffect(() => {
    if (mapRef.current && endPoint) {
      if (!endMarkerRef.current) {
        endMarkerRef.current = new mapboxgl.Marker({ color: "red" })
          .setLngLat([endPoint.lng, endPoint.lat])
          .addTo(mapRef.current);
      } else {
        endMarkerRef.current.setLngLat([endPoint.lng, endPoint.lat]);
      }
    }
  }, [endPoint]);

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

    // if (markerRef.current[type]) markerRef.current[type]!.remove();
    // markerRef.current[type] = new mapboxgl.Marker()
    //   .setLngLat([coordinates.lng, coordinates.lat])
    //   .addTo(mapRef.current!);
    // mapRef.current!.flyTo({
    //   center: [coordinates.lng, coordinates.lat],
    //   zoom: 14,
    // });
  };

  return <div ref={mapContainerRef} className="h-[500px] w-full rounded-lg" />;
};

export default MapPages;
