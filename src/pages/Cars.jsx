import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Helmet } from "react-helmet-async";

const AVERAGE_SPEED_KMH = 50;

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

const haversineDistance = (coord1, coord2) => {
  const toRad = (angle) => (Math.PI / 180) * angle;
  const R = 6371;
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLng = toRad(coord2.lng - coord1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) *
      Math.cos(toRad(coord2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const CarPages = () => {
  const [location, setLocation] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [address, setAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(null);

  useEffect(() => {
    if (startPoint && endPoint) {
      const distance = haversineDistance(startPoint, endPoint);
      const timeInHours = distance / AVERAGE_SPEED_KMH;
      const timeInMinutes = Math.round(timeInHours * 60);
      setEstimatedTime(timeInMinutes);
    } else {
      setEstimatedTime(null);
    }
  }, [startPoint, endPoint]);

  useEffect(() => {
    const updateLocation = () => {
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
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    updateLocation();
    const interval = setInterval(updateLocation, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSetStartPoint = async () => {
    const coordinates = await geocodeAddress(address);
    if (coordinates) setStartPoint(coordinates);
  };

  const handleSetEndPoint = async () => {
    const coordinates = await geocodeAddress(endAddress);
    if (coordinates) setEndPoint(coordinates);
  };

  const handleResetPoints = () => {
    setStartPoint(null);
    setEndPoint(null);
    setAddress("");
    setEndAddress("");
    setEstimatedTime(null);
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
          <div className="mt-2 justify-center">
            <h4 className="text-md font-semibold">Titik Awal</h4>
            <input
              type="text"
              placeholder="Masukkan Alamat Awal"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="p-2 border rounded mt-2"
            />
            <button
              onClick={handleSetStartPoint}
              className="ml-2 px-10 py-2 bg-blue-500 text-white rounded"
            >
              Set
            </button>
          </div>
          <div className="mt-4">
            <h4 className="text-md font-semibold">Titik Tujuan</h4>
            <input
              type="text"
              placeholder="Masukkan Alamat Tujuan"
              value={endAddress}
              onChange={(e) => setEndAddress(e.target.value)}
              className="p-2 border rounded mt-2"
            />
            <button
              onClick={handleSetEndPoint}
              className="ml-2 px-10 py-2 bg-blue-500 text-white rounded"
            >
              Set
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
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {/* <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" /> */}

              <Marker position={location}>
                <Popup>Lokasi Saat Ini</Popup>
              </Marker>
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
              {startPoint && endPoint && (
                <Polyline positions={[startPoint, endPoint]} color="green" />
              )}
            </MapContainer>
          )}
        </div>
      </div>
    </>
  );
};

export default CarPages;
