import mapboxgl from "mapbox-gl";
import React, { useEffect } from "react";

export const useFItBoundsHook = (
  mapRef: React.RefObject<mapboxgl.Map | null>,
  startPoint: { lng: number; lat: number } | null,
  endPoint: { lng: number; lat: number } | null
) => {
  useEffect(() => {
    if (startPoint && endPoint && mapRef.current) {
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend([startPoint.lng, startPoint.lat]);
      bounds.extend([endPoint.lng, endPoint.lat]);

      if (mapRef.current.isStyleLoaded()) {
        mapRef.current.fitBounds(bounds, { padding: 200, maxZoom: 14 });
      }
    }
  }, [startPoint, endPoint, mapRef]);
  return;
};
