import React, { forwardRef, useEffect, useRef, useState } from "react";
import { InputComponent } from "../atom/Input";
import mapboxgl from "mapbox-gl";
import ButtonComponent from "../atom/Button";
import SubTitle from "../atom/SubTitle";
import SelectComponent from "../atom/Select";
import DateInputComponent from "../atom/Date";

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

const AddDeliveryForm = forwardRef<HTMLDivElement>((_, ref) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<{
    start: mapboxgl.Marker | null;
    end: mapboxgl.Marker | null;
  }>({ start: null, end: null });

  const [startPoint, setStartPoint] = useState<{
    lng: number;
    lat: number;
  } | null>(null);
  const [endPoint, setEndPoint] = useState<{ lng: number; lat: number } | null>(
    null
  );
  const [route, setRoute] = useState<GeoJSON.LineString | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | string | null>(null);
  const [address, setAddress] = useState<string>("");
  const [endAddress, setEndAddress] = useState<string>("");
  const [startSuggestions, setStartSuggestions] = useState<Place[]>([]);
  const [endSuggestions, setEndSuggestions] = useState<Place[]>([]);

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
        center: [106.8456, -6.2088],
        zoom: 12,
      });
    }
  }, [ref]);

  const fetchRoute = async () => {
    if (!startPoint || !endPoint) return;
    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${startPoint.lng},${startPoint.lat};${endPoint.lng},${endPoint.lat}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();

      if (data.routes.length > 0) {
        const newRoute: GeoJSON.LineString = data.routes[0].geometry;
        const distanceInKm = parseFloat(
          (data.routes[0].distance / 1000).toFixed(2)
        );

        // const estimatedHours = distanceInKm / 40;
        // const estimatedMinutes = Math.ceil(estimatedHours * 60)
        const durationInMinutes = Math.ceil(data.routes[0].duration / 60);
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;
        const formattedDuration =
          hours > 0 ? `${hours} jam ${minutes} menit` : `${minutes} menit`;

        setRoute(newRoute);
        setDistance(distanceInKm);
        setDuration(formattedDuration);

        console.log(`Jarak: ${distanceInKm} km`);
        console.log(`Waktu tempuh: ${formattedDuration}`);

        const map = mapRef.current!;
        if (map.getSource("route")) {
          (map.getSource("route") as mapboxgl.GeoJSONSource).setData({
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
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  const handleSelectAddress = (
    place: Place,
    setPoint: React.Dispatch<
      React.SetStateAction<{ lng: number; lat: number } | null>
    >,
    setAddress: React.Dispatch<React.SetStateAction<string>>,
    setSuggestions: React.Dispatch<React.SetStateAction<Place[]>>,
    type: "start" | "end"
  ) => {
    const coordinates = {
      lng: place.geometry.coordinates[0],
      lat: place.geometry.coordinates[1],
    };
    setPoint(coordinates);
    setAddress(place.place_name);
    setSuggestions([]);

    if (markerRef.current[type]) markerRef.current[type]!.remove();
    const markerColor = type === "start" ? "#0ebdf6" : "#ffa7a7";
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<div style="background-color: ${markerColor};
      color:#000;
      padding: 6px 10px;
      border-radius: 5px;
      font-size:12px;
      font-weigh:bold;
      text-align:center;
      box-shadow: 0px 2px 6px rgba(0,0,0,0.2);">
          ${type === "start" ? "keberangkatan" : "tujuan"}</div>`
    );

    markerRef.current[type] = new mapboxgl.Marker()
      .setLngLat([coordinates.lng, coordinates.lat])
      .setPopup(popup)
      .addTo(mapRef.current!);

    markerRef.current[type]!.togglePopup();

    mapRef.current!.flyTo({
      center: [coordinates.lng, coordinates.lat],
      zoom: 14,
    });
  };

  useEffect(() => {
    if (startPoint && endPoint) {
      fetchRoute();
    }
  }, [startPoint, endPoint]);

  useEffect(() => {
    if (startPoint && endPoint && mapRef.current) {
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend([startPoint.lng, startPoint.lat]);
      bounds.extend([endPoint.lng, endPoint.lat]);

      if (mapRef.current.isStyleLoaded()) {
        mapRef.current.fitBounds(bounds, { padding: 200, maxZoom: 14 });
      }
    }
  }, [startPoint, endPoint]);

  const clearMap = () => {
    setStartPoint(null);
    setEndPoint(null);
    setRoute(null);
    setDistance(null);
    setDuration(null);
    setAddress("");
    setEndAddress("");

    if (markerRef.current.start) markerRef.current.start.remove();
    if (markerRef.current.end) markerRef.current.end.remove();

    if (mapRef.current?.getSource("route")) {
      mapRef.current.removeLayer("route");
      mapRef.current.removeSource("route");
    }
  };

  const [formData, setFormData] = useState({
    customer: "",
    muatan: "",
    jumlahMuatan: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-5 rounded-lg text-sm bg-secondary"
    >
      <SubTitle
        subTitle="Form Tambah Pengiriman"
        className="text-center mb-5"
      />
      <SelectComponent
        label="Customer"
        name="customer"
        value={formData.customer}
        onChange={handleChange}
        options={[
          { value: "cihuy", label: "cihuy" },
          { value: "cihuy1", label: "cihuy1" },
          { value: "cihuy2", label: "cihuy2" },
          { value: "cihuy3", label: "cihuy3" },
        ]}
      />
      <InputComponent
        label="Muatan"
        type="text"
        name="muatan"
        value={formData.muatan}
        onChange={handleChange}
      />
      <InputComponent
        label="Jumlah Muatan"
        type="text"
        name="jumlahMuatan"
        value={formData.jumlahMuatan}
        onChange={handleChange}
      />
      <SelectComponent
        label="Driver"
        options={[
          { value: "Tyo", label: "Tyo" },
          { value: "Febri", label: "Febri" },
          { value: "Farizky", label: "Farizky" },
        ]}
      />
      <SelectComponent
        label="Kendaraan"
        options={[
          { value: "Toyota Pickup", label: "Toyota Pickup" },
          { value: "Fuso Box", label: "Fuso Box" },
          { value: "CDC", label: "CDC" },
        ]}
      />
      <div className="w-full relative">
        <InputComponent
          label="Keberangkatan"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            fetchAddressSuggestions(e.target.value, setStartSuggestions);
          }}
        />
        <ul className="absolute top-full left-0 bg-primary text-sm rounded w-full mt-1 z-10">
          {startSuggestions.map((place) => (
            <li
              key={place.id}
              className="p-2 hover:bg-gray-600 cursor-pointer"
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
      <div className="w-full relative">
        <InputComponent
          label="Tujuan Pengiriman"
          value={endAddress}
          onChange={(e) => {
            setEndAddress(e.target.value);
            fetchAddressSuggestions(e.target.value, setEndSuggestions);
          }}
        />
        <ul className="absolute top-full left-0 bg-primary text-sm rounded w-full mt-1 z-10">
          {endSuggestions.map((place) => (
            <li
              key={place.id}
              className="p-2 hover:bg-gray-600 cursor-pointer"
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
      {distance !== null && duration !== null && (
        <div className="bg-primary p-2 rounded-lg text-sm space-y-2">
          <p>
            Jarak: <strong>{distance} Km</strong>
          </p>
          <p>
            Perkiraan waktu: <strong>{duration}</strong>
          </p>
        </div>
      )}
      <DateInputComponent label="Tanggal Pengiriman" />
      <DateInputComponent label="Batas Pengiriman" />
      {/* TODO: Toral didapat dari harga sewa mobil x jarak */}
      <InputComponent label="Total" disabled={true}/>

      <div className="flex justify-center gap-5 w-full p-2">
        <ButtonComponent
          variant="back"
          label="Kembali"
          className="py-2 w-1/3"
        />
        <ButtonComponent
          variant="undo"
          label="Ulangi"
          className="py-2 w-1/3"
          // TODO: buat agar menghapus semua input
          onClick={clearMap}
        />
        <ButtonComponent variant="save" label="Simpan" className="py-2 w-1/3" />
      </div>
    </form>
  );
});

export default AddDeliveryForm;
