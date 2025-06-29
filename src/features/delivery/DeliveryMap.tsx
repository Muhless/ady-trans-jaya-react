import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import { API_BASE_URL } from "../../apiConfig";

mapboxgl.accessToken =
  "pk.eyJ1IjoibXVobGVzcyIsImEiOiJjbTZtZGM1eXUwaHQ5MmtwdngzaDFnaWxnIn0.jH96XLB-3WDcrw9OKC95-A";

const DeliveryMap: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const [pickupCoords, setPickupCoords] = useState<[number, number] | null>(
    null
  );
  const [destinationCoords, setDestinationCoords] = useState<
    [number, number] | null
  >(null);

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/delivery/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
        const json = await res.json();
        const delivery = json.data;

        setPickupCoords([
          delivery.pickup_address_lang,
          delivery.pickup_address_lat,
        ]);
        setDestinationCoords([
          delivery.destination_address_lang,
          delivery.destination_address_lat,
        ]);
      } catch (error) {
        console.error("Gagal mengambil data pengiriman:", error);
      }
    };

    if (id) fetchDelivery();
  }, [id]);

  useEffect(() => {
    if (!pickupCoords || !destinationCoords || !mapContainerRef.current) return;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: pickupCoords,
      zoom: 12,
      maxBounds: [
        [95.0, -11.0],
        [141.0, 6.1],
      ],
    });

    mapRef.current = map;

    map.on("load", async () => {
      new mapboxgl.Marker({ color: "green" })
        .setLngLat(pickupCoords)
        .setPopup(new mapboxgl.Popup().setText("Lokasi Penjemputan"))
        .addTo(map);

      new mapboxgl.Marker({ color: "red" })
        .setLngLat(destinationCoords)
        .setPopup(new mapboxgl.Popup().setText("Tujuan Pengiriman"))
        .addTo(map);

      const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${pickupCoords.join(
        ","
      )};${destinationCoords.join(
        ","
      )}?geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`;

      try {
        const response = await fetch(directionsUrl);
        const data = await response.json();
        const route = data.routes[0].geometry;

        map.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: route,
            properties: {},
          },
        });

        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#007bff",
            "line-width": 4,
          },
        });

        const coordinates = route.coordinates;
        const bounds = coordinates.reduce(
          (b, coord) => b.extend(coord),
          new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
        );
        map.fitBounds(bounds, { padding: 50 });
      } catch (err) {
        console.error("Gagal mengambil rute dari Mapbox Directions API:", err);
      }
    });

    return () => {
      map.remove();
    };
  }, [pickupCoords, destinationCoords]);

  return (
    <div
      ref={mapContainerRef}
      className="absolute z-0 w-full flex items-center h-full"
      style={{
        height: "90vh",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    />
  );
};

export default DeliveryMap;
