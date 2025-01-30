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

// Helper function for geocoding address to coordinates
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

const CarPages = () => {
  const [location, setLocation] = useState(null); // Removed default location
  const [routes, setRoutes] = useState(() => {
    const savedRoutes = localStorage.getItem("routes");
    return savedRoutes ? JSON.parse(savedRoutes) : {};
  });
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [newRouteName, setNewRouteName] = useState("");
  const [newRoutePoints, setNewRoutePoints] = useState([]);
  const [startPoint, setStartPoint] = useState(null); // Start point will be set by button click
  const [endPoint, setEndPoint] = useState(null); // Destination point will be set by button click
  const [address, setAddress] = useState(""); // To store address input for start point
  const [endAddress, setEndAddress] = useState(""); // To store address input for end point

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

  useEffect(() => {
    localStorage.setItem("routes", JSON.stringify(routes));
  }, [routes]);

  const handleAddPoint = () => {
    setNewRoutePoints([...newRoutePoints, location]);
  };

  const handleSaveRoute = () => {
    if (newRouteName && newRoutePoints.length > 0) {
      setRoutes({ ...routes, [newRouteName]: newRoutePoints });
      setNewRouteName("");
      setNewRoutePoints([]);
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSetStartPoint = async () => {
    const coordinates = await geocodeAddress(address);
    if (coordinates) {
      setStartPoint(coordinates);
    }
  };

  const handleEndAddressChange = (e) => {
    setEndAddress(e.target.value);
  };

  const handleSetEndPoint = async () => {
    const coordinates = await geocodeAddress(endAddress);
    if (coordinates) {
      setEndPoint(coordinates);
    }
  };

  const handleMapClick = (e) => {
    // Set the start point to the clicked location
    setStartPoint(e.latlng);
  };

  return (
    <>
      <Helmet>
        <title>Halaman Mobil - Tracking</title>
      </Helmet>
      <div className="flex flex-row items-center justify-center mx-auto container">
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Titik Awal dan Tujuan</h3>
          <div className="mt-2">
            <h4 className="text-md font-semibold">Titik Awal (Alamat)</h4>
            <input
              type="text"
              placeholder="Masukkan Alamat Awal"
              value={address}
              onChange={handleAddressChange}
              className="p-2 border rounded mt-2"
            />
            <button
              onClick={handleSetStartPoint} // Add the click handler for setting the start point
              className="ml-2 p-2 bg-blue-500 text-white rounded"
            >
              Set
            </button>
          </div>
          <div className="mt-4">
            <h4 className="text-md font-semibold">Titik Tujuan (Alamat)</h4>
            <input
              type="text"
              placeholder="Masukkan Alamat Tujuan"
              value={endAddress}
              onChange={handleEndAddressChange}
              className="p-2 border rounded mt-2"
            />
            <button
              onClick={handleSetEndPoint} // Add the click handler for setting the end point
              className="ml-2 p-2 bg-green-500 text-white rounded"
            >
              Set
            </button>
          </div>
          <div className="mt-5 bg-blue-500 items-center ">
            <button>simpan</button>
          </div>
        </div>

        {/* Map component */}
        {location && ( // Only render the map if location is available
          <MapContainer
            center={location}
            zoom={13}
            style={{ height: "600px", width: "50%" }}
            className="mt-10"
            onClick={handleMapClick} // Listen for click events on the map
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={location}>
              <Popup>Lokasi Saat Ini</Popup>
            </Marker>
            {selectedRoute &&
              routes[selectedRoute] &&
              routes[selectedRoute].length > 0 && (
                <Polyline positions={routes[selectedRoute]} color="blue" />
              )}
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

            {/* Draw route line (Polyline) */}
            {startPoint && endPoint && (
              <Polyline positions={[startPoint, endPoint]} color="green" />
            )}
          </MapContainer>
        )}
      </div>
    </>
  );
};

export default CarPages;
