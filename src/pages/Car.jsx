import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Helmet } from "react-helmet-async";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibXVobGVzcyIsImEiOiJjbTZtZGM1eXUwaHQ5MmtwdngzaDFnaWxnIn0.jH96XLB-3WDcrw9OKC95-A";
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const fetchAddressSuggestions = async (query, setSuggestions) => {
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

const geocodeAddress = async (address) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
    );
    const data = await response.json();
    if (data.features.length > 0) {
      return {
        lng: data.features[0].geometry.coordinates[0],
        lat: data.features[0].geometry.coordinates[1],
      };
    }
    return null;
  } catch (error) {
    console.error("Error geocoding address:", error);
    return null;
  }
};

const CarPages = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef({ start: null, end: null });

  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [route, setRoute] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [address, setAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [endSuggestions, setEndSuggestions] = useState([]);

  useEffect(() => {
    if (!mapRef.current) {
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

    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${startPoint.lng},${startPoint.lat};${endPoint.lng},${endPoint.lat}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`
    );
    const data = await response.json();

    if (data.routes.length > 0) {
      const newRoute = data.routes[0].geometry;
      setRoute(newRoute);
      setDistance((data.routes[0].distance / 1000).toFixed(2)); // dalam km
      setDuration(Math.ceil(data.routes[0].duration / 60)); // dalam menit

      const map = mapRef.current;
      if (map.getSource("route")) {
        map.getSource("route").setData({
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
  };

  const handleSelectAddress = (
    place,
    setPoint,
    setAddress,
    setSuggestions,
    type
  ) => {
    const coordinates = {
      lng: place.geometry.coordinates[0],
      lat: place.geometry.coordinates[1],
    };
    setPoint(coordinates);
    setAddress(place.place_name);
    setSuggestions([]);

    if (markerRef.current[type]) markerRef.current[type].remove();
    markerRef.current[type] = new mapboxgl.Marker()
      .setLngLat([coordinates.lng, coordinates.lat])
      .addTo(mapRef.current);
    mapRef.current.flyTo({
      center: [coordinates.lng, coordinates.lat],
      zoom: 14,
    });
  };

  useEffect(() => {
    if (startPoint && endPoint) {
      fetchRoute();
    }
  }, [startPoint, endPoint]);

  const handleReset = () => {
    setStartPoint(null);
    setEndPoint(null);
    setRoute(null);
    setDistance(null);
    setDuration(null);
    setAddress("");
    setEndAddress("");

    if (markerRef.current.start) markerRef.current.start.remove();
    if (markerRef.current.end) markerRef.current.end.remove();

    if (mapRef.current.getSource("route")) {
      mapRef.current.removeLayer("route");
      mapRef.current.removeSource("route");
    }
  };

  return (
    <>
      <Helmet>
        <title>Halaman Mobil - Tracking</title>
      </Helmet>
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
          <div className="flex flex-row gap-x-5 items-center">
            <div className="mt-2 text-center">
              <h4 className="text-md font-semibold">Titik Awal</h4>
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
            <div className="mt-12">cihuy</div>
            <div className="mt-2 text-center">
              <h4 className="text-md font-semibold">Titik Tujuan</h4>
              <input
                type="text"
                placeholder="Masukkan Alamat Tujuan"
                value={endAddress}
                onChange={(e) => {
                  setEndAddress(e.target.value);
                  fetchAddressSuggestions(e.target.value, setEndSuggestions);
                }}
                className="p-2 border rounded mt-2 w-full"
              />
              <ul className="bg-white border rounded w-full mt-1">
                {endSuggestions.map((place) => (
                  <li
                    key={place.id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() =>
                      handleSelectAddress(
                        place,
                        setEndPoint,
                        setEndAddress,
                        setEndSuggestions,
                        "end"
                      )
                    }
                  >
                    {place.place_name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {distance && duration && (
            <div className="mt-2 flex flex-row w-full justify-between">
              <p className="">Jarak: {distance} km</p>
              <p className="">Waktu Tempuh: {duration} menit</p>
            </div>
          )}
          <div className="flex flex-row gap-4">
            <button
              onClick={handleReset}
              className="p-2 w-full bg-red-500 text-white rounded mt-4"
            >
              Reset
            </button>
            <button className="py-2 px-36 w-full bg-blue-500 text-white rounded mt-4">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarPages;
