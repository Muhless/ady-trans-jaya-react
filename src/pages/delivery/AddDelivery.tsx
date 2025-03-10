import React, { useState } from "react";
import Title from "../../components/Atom/Title";
import Form from "../../components/Molecule/Form";
import ButtonComponent from "../../components/Atom/Button";
import MapPages from "../Map";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibXVobGVzcyIsImEiOiJjbTZtZGM1eXUwaHQ5MmtwdngzaDFnaWxnIn0.jH96XLB-3WDcrw9OKC95-A";
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

interface Place {
  id: string;
  place_name: string;
  geometry: {
    coordinates: [number, number];
  };
}

const fetchAddressSuggestions = async (
  query: string,
  setSuggestions: React.Dispatch<React.SetStateAction<Place[]>>
) => {
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

function AddDeliveryPages() {
  const [address, setAddress] = useState<string>("");
  const [endAddress, setEndAddress] = useState<string>("");
  const [startSuggestions, setStartSuggestions] = useState<Place[]>([]);
  const [endSuggestions, setEndSuggestions] = useState<Place[]>([]);
  const [startPoint, setStartPoint] = useState<{
    lng: number;
    lat: number;
  } | null>(null);
  const [endPoint, setEndPoint] = useState<{ lng: number; lat: number } | null>(
    null
  );

  const handleSelectAddress = (
    place: Place,
    setPoint: React.Dispatch<
      React.SetStateAction<{ lng: number; lat: number } | null>
    >,
    setAddress: React.Dispatch<React.SetStateAction<string>>,
    setSuggestions: React.Dispatch<React.SetStateAction<Place[]>>
  ) => {
    const coordinates = {
      lng: place.geometry.coordinates[0],
      lat: place.geometry.coordinates[1],
    };

    setPoint(coordinates);
    setAddress(place.place_name);
    setSuggestions([]);
  };

  return (
    <>
      <Title title={"Tambah Pengiriman"} />
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <div className="flex justify-center">
            <Form
              fields={[
                {
                  label: "Customer",
                  options: [
                    { value: "jakarta", label: "Jakarta" },
                    { value: "bandung", label: "Bandung" },
                    { value: "surabaya", label: "Surabaya" },
                  ],
                },
                { label: "Muatan", type: "text", placeholder: "Jenis muatan" },
                {
                  label: "Berat",
                  type: "text",
                  placeholder: "Berat muatan",
                },
                {
                  label: "Titik Awal Pengiriman",
                  type: "text",
                  placeholder: "Tentukan awal pengiriman",
                  value: address,
                  onChange: (e) => {
                    setAddress(e.target.value);
                    fetchAddressSuggestions(
                      e.target.value,
                      setStartSuggestions
                    );
                  },
                },
                {
                  label: "Titik Tujuan Pengiriman",
                  type: "text",
                  placeholder: "Tentukan tujuan pengiriman",
                  value: endAddress,
                  onChange: (e) => {
                    setEndAddress(e.target.value);
                    fetchAddressSuggestions(e.target.value, setEndSuggestions);
                  },
                },

                {
                  label: "Tanggal Pengiriman",
                  type: "date",
                },
                {
                  label: "Tenggat Pengiriman",
                  type: "date",
                },
                {
                  label: "Driver",
                  options: [
                    { value: "ady", label: "ady" },
                    { value: "cihuy", label: "cihuy" },
                    { value: "jaya", label: "jaya" },
                  ],
                },
                {
                  label: "Kendaraan",
                  options: [
                    { value: "Toyota Avanza", label: "Toyota Avanza" },
                    { value: "Mitsubishi Fuso", label: "Mitsubishi Fuso" },
                    { value: "Toyota Pickup", label: "Toyota Pickup" },
                  ],
                },
              ]}
            />
          </div>
          {/* Sugesti Titik Awal */}
          {startSuggestions.length > 0 && (
            <ul className="bg-secondary border rounded w-full mt-1 text-sm">
              {startSuggestions.map((place) => (
                <li
                  key={place.id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() =>
                    handleSelectAddress(
                      place,
                      setStartPoint,
                      setAddress,
                      setStartSuggestions
                    )
                  }
                >
                  {place.place_name}
                </li>
              ))}
            </ul>
          )}

          {/* Sugesti Titik Tujuan */}
          {endSuggestions.length > 0 && (
            <ul className="bg-secondary text-sm border rounded w-full mt-1">
              {endSuggestions.map((place) => (
                <li
                  key={place.id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() =>
                    handleSelectAddress(
                      place,
                      setEndPoint,
                      setEndAddress,
                      setEndSuggestions
                    )
                  }
                >
                  {place.place_name}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-row justify-center gap-10 mt-5">
            <ButtonComponent variant="back" label="Kembali" classname="py-2" />
            <ButtonComponent variant="save" label="Simpan" />
          </div>
        </div>
        <div className="col-span-2">
          <MapPages
            address={address}
            setAddress={setAddress}
            endAddress={endAddress}
            setEndAddress={setEndAddress}
            setStartPoint={setStartPoint}
            setEndPoint={setEndPoint}
            startPoint={startPoint}
            endPoint={endPoint}
          />
        </div>
      </div>
    </>
  );
}

export default AddDeliveryPages;
