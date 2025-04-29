import { useMapboxHook } from "./useMapAndRoute";
import { useState } from "react";
import { useFItBoundsHook } from "./useFItBounds";
import { useRoute } from "./useRoute";

export const useFetchRouteHooks = (ref: React.RefObject<HTMLDivElement>) => {
  const mapRef = useMapboxHook(ref);
  const [startPoint, setStartPoint] = useState<{
    lng: number;
    lat: number;
  } | null>(null);
  const [endPoint, setEndPoint] = useState<{ lng: number; lat: number } | null>(
    null
  );

  const {
    route,
    setRoute,
    distance,
    setDistance,
    duration,
    setDuration,
    fetchRoute,
  } = useRoute(startPoint, endPoint);
  useFItBoundsHook(mapRef, startPoint, endPoint);

  return {
    route,
    setRoute,
    distance,
    setDistance,
    duration,
    setDuration,
    fetchRoute,
    startPoint,
    setStartPoint,
    endPoint,
    setEndPoint,
  };
};
