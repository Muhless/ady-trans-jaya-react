import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Helmet } from "react-helmet-async";

const AVERAGE_SPEED_KMH = 30;
const ORS_API_KEY = "5b3ce3597851110001cf6248170db34a6957467ca86d2df46b4c1fe8";

const geocodeAddress = async (address) => {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=998418d39b72428abc33fb5ef721563e`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      return {
        lat: data.results[0].geometry.lat,
        lng: data.results[0].geometry.lng,
      };
    }
    return null;
  } catch (error) {
    console.error("Error geocoding address:", error);
    return null;
  }
};

const fetchRoute = async (start, end, setRoute) => {
  try {
    const response = await fetch("http://localhost:8080/getRoute", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        start_lat: start.lat,
        start_lang: start.lang,
        end_lat: end.lat,
        end_lang: end.lang,
      }),
    });
    const data = await response.json();
    if (data.routes && data.routes.length > 0) {
      const routeCoords = data.routes[0].geometry.coordinates.map(
        ([lng, lat]) => ({ lat, lng })
      );
      setRoute(routeCoords);
    }
  } catch (error) {
    console.error("Error fetching route:", error);
  }
};

const MapViewUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 12);
    }
  }, [position, map]);
  return null;
};

const CarPages = () => {
  const [location, setLocation] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [route, setRoute] = useState(null);
  const [address, setAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [focusPoint, setFocusPoint] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (startPoint && endPoint) {
      fetchRoute(startPoint, endPoint, setRoute);
    } else {
      setRoute(null);
    }
  }, [startPoint, endPoint]);

  const handleSetStartPoint = async () => {
    const coordinates = await geocodeAddress(address);
    if (coordinates) {
      setStartPoint(coordinates);
      setFocusPoint(coordinates);
    }
  };

  const handleSetEndPoint = async () => {
    const coordinates = await geocodeAddress(endAddress);
    if (coordinates) {
      setEndPoint(coordinates);
      setFocusPoint(coordinates);
    }
  };

  const handleResetPoints = () => {
    setStartPoint(null);
    setEndPoint(null);
    setRoute(null);
    setAddress("");
    setEndAddress("");
    setEstimatedTime(null);
    setFocusPoint(null);
  };

  return (
    <>
      <Helmet>
        <title>Halaman Mobil - Tracking</title>
      </Helmet>
      <div className="flex mt-6 container mx-auto items-center">
        <div className="w-1/3 px-5">
          <h3 className="text-3xl font-semibold font-jakarta">
            Titik Awal dan Tujuan
          </h3>
          <div className="mt-2">
            <h4 className="text-md font-semibold">Titik Awal</h4>
            <input
              type="text"
              placeholder="Masukkan Alamat Awal"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="p-2 border rounded mt-2 w-full"
            />
            <button
              onClick={handleSetStartPoint}
              className="mt-2 w-full py-2 bg-blue-500 text-white rounded"
            >
              Set Titik Awal
            </button>
          </div>
          <div className="mt-4">
            <h4 className="text-md font-semibold">Titik Tujuan</h4>
            <input
              type="text"
              placeholder="Masukkan Alamat Tujuan"
              value={endAddress}
              onChange={(e) => setEndAddress(e.target.value)}
              className="p-2 border rounded mt-2 w-full"
            />
            <button
              onClick={handleSetEndPoint}
              className="mt-2 w-full py-2 bg-blue-500 text-white rounded"
            >
              Set Titik Tujuan
            </button>
          </div>
          {estimatedTime !== null && (
            <p className="mt-4 text-md text-gray-500">
              Perkiraan Waktu Tempuh: {estimatedTime} menit
            </p>
          )}
          <div className="mt-5">
            <button
              onClick={handleResetPoints}
              className="p-2 w-full bg-red-500 text-white rounded"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="w-full h-full">
          {location && (
            <MapContainer
              center={location}
              zoom={13}
              style={{ height: "600px", width: "100%" }}
              className="mt-10"
            >
              <MapViewUpdater position={focusPoint || location} />
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {startPoint && (
                <Marker position={startPoint}>
                  <Popup>Titik Awal</Popup>
                </Marker>
              )}
              {endPoint && (
                <Marker position={endPoint}>
                  <Popup>Titik Tujuan</Popup>
                </Marker>
              )}
              {route && <Polyline positions={route} color="blue" />}
            </MapContainer>
          )}
        </div>
      </div>
    </>
  );
};

export default CarPages;
