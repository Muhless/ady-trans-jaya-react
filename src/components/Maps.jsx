import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Helmet } from "react-helmet-async";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibXVobGVzcyIsImEiOiJjbTZtZGM1eXUwaHQ5MmtwdngzaDFnaWxnIn0.jH96XLB-3WDcrw9OKC95-A";
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const MapContainer = ({ startPoint, endPoint, route, markerRef }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [106.8456, -6.2088], // Jakarta default
        zoom: 10,
      });
    }
  }, []);

  useEffect(() => {
    if (startPoint) {
      if (markerRef.current.start) markerRef.current.start.remove();
      markerRef.current.start = new mapboxgl.Marker()
        .setLngLat([startPoint.lng, startPoint.lat])
        .addTo(mapRef.current);
    }
    if (endPoint) {
      if (markerRef.current.end) markerRef.current.end.remove();
      markerRef.current.end = new mapboxgl.Marker()
        .setLngLat([endPoint.lng, endPoint.lat])
        .addTo(mapRef.current);
    }
    if (startPoint && endPoint) {
      mapRef.current.flyTo({
        center: [startPoint.lng, startPoint.lat],
        zoom: 14,
      });
    }
  }, [startPoint, endPoint]);

  useEffect(() => {
    if (route && mapRef.current) {
      if (mapRef.current.getSource("route")) {
        mapRef.current.getSource("route").setData({
          type: "Feature",
          properties: {},
          geometry: route,
        });
      } else {
        mapRef.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: route,
          },
        });
        mapRef.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#1E90FF", "line-width": 5 },
        });
      }
    }
  }, [route]);

  return (
    <div ref={mapContainerRef} style={{ height: "600px", width: "100%" }} />
  );
};
