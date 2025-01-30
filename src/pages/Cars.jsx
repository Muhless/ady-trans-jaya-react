import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Helmet } from "react-helmet-async";

const CarPages = () => {
  const [location, setLocation] = useState({ lat: -6.2, lng: 106.8 }); // Lokasi default: Jakarta

  // Update lokasi setiap 5 detik menggunakan Geolocation API
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

    updateLocation(); // Ambil lokasi pertama kali
    const interval = setInterval(updateLocation, 5000); // Update lokasi setiap 5 detik

    return () => clearInterval(interval); // Hapus interval saat komponen tidak digunakan
  }, []);

  return (
    <>
      <Helmet>
        <title>Halaman Mobil - Tracking</title>
      </Helmet>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold text-center mb-4">Tracking Mobil</h1>
        <MapContainer center={location} zoom={13} style={{ height: "400px", width: "80%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={location}>
            <Popup>Lokasi Saat Ini</Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
};

export default CarPages;
