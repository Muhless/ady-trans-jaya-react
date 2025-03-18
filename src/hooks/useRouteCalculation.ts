import { useState, useEffect } from "react";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibXVobGVzcyIsImEiOiJjbTZtZGM1eXUwaHQ5MmtwdngzaDFnaWxnIn0.jH96XLB-3WDcrw9OKC95-A";

export const useRouteCalculation = (
  startPoint: { lng: number; lat: number } | null,
  endPoint: { lng: number; lat: number } | null,
  mapRef: React.MutableRefObject<mapboxgl.Map | null>
) => {
  const [route, setRoute] = useState<GeoJSON.LineString | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | string | null>(null);

  useEffect(() => {
    if (!startPoint || !endPoint) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchRoute = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${startPoint.lng},${startPoint.lat};${endPoint.lng},${endPoint.lat}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`,
          { signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch route data");
        }

        const data = await response.json();
        if (data.routes.length === 0) return;

        const newRoute: GeoJSON.LineString = data.routes[0].geometry;
        const distanceInKm = parseFloat(
          (data.routes[0].distance / 1000).toFixed(2)
        );

        const durationInMinutes = Math.ceil(data.routes[0].duration / 60);
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;
        const formattedDuration =
          hours > 0 ? `${hours} jam ${minutes} menit` : `${minutes} menit`;

        setRoute(newRoute);
        setDistance(distanceInKm);
        setDuration(formattedDuration);

        console.log(`Jarak: ${distanceInKm} km`);
        console.log(`Waktu tempuh: ${formattedDuration}`);

        const map = mapRef.current;
        if (!map) return;

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
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching route:", error);
        }
      }
    };

    fetchRoute();

    return () => controller.abort();
  }, [startPoint, endPoint, mapRef]);

  return { route, distance, duration };
};
