import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

export const useMapboxHook = (ref: React.RefObject<HTMLDivElement>) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoibXVobGVzcyIsImEiOiJjbTZtZGM1eXUwaHQ5MmtwdngzaDFnaWxnIn0.jH96XLB-3WDcrw9OKC95-A";

  console.log("Mapbox Access Token:", MAPBOX_ACCESS_TOKEN);
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
  
  useEffect(() => {
    if (
      !mapRef.current &&
      ref &&
      (ref as React.RefObject<HTMLDivElement>)?.current instanceof HTMLElement
    ) {
      mapRef.current = new mapboxgl.Map({
        container: (ref as React.RefObject<HTMLDivElement>)
          .current as HTMLDivElement,
        style: "mapbox://styles/mapbox/streets-v11",
        // style: "mapbox://styles/mapbox/dark-v11",
        center: [106.6297, -6.1781], // Tangerang
        // maxBounds: jawaBounds,
        maxBounds: [
          [94.972, -11.0076],
          [141.019, 6.077],
        ],
      });
      mapRef.current.scrollZoom.enable();
      mapRef.current.doubleClickZoom.enable();
    }
  }, [ref]);
  return mapRef;
};
