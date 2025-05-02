import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { InputComponent } from "../input/Input";
import ButtonComponent from "../button/Index";
import SubTitle from "../SubTitle";
import SelectComponent from "../input/Select";
import useNavigationHooks from "../../hooks/useNavigation";
import Card from "../card";
import { useFetchOptions } from "../../hooks/useFetchOptions";
import mapboxgl from "mapbox-gl";
import { useDeliveryCalculation } from "../../hooks/useDeliveryCost";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useDeliveryStore } from "../../stores/deliveryStore";
import SearchLocationInput from "../map/SearchLocation";
import { InputLatLang } from "../input/InputLatLang";
import { MapPin } from "lucide-react";

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
      )}.json?autocomplete=true&bbox=104.5,-8.5,114.5,-5.5&access_token=${MAPBOX_ACCESS_TOKEN}`
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
    lat: number;
    lng: number;
  } | null>(null);
  const [endPoint, setEndPoint] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [route, setRoute] = useState<GeoJSON.LineString | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | string | null>(null);
  const [pickupLocation, setPickupLocation] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [startSuggestions, setStartSuggestions] = useState<Place[]>([]);
  const [endSuggestions, setEndSuggestions] = useState<Place[]>([]);
  const [selectingPoint, setSelectingPoint] = useState<"start" | "end" | null>(
    null
  );
  const [startLocation, setStartLocation] = React.useState<string>("");
  const { goBack, goToTransactionPages } = useNavigationHooks();
  const driverOptions = useFetchOptions("http://localhost:8080/api/driver");
  const formatVehicleLabel = useCallback(
    (vehicle: {
      name: string;
      type: string;
      // capacity: string;
      rate_per_km: number;
    }) => {
      return `${vehicle.name} (${vehicle.type.toUpperCase()}) - 
      Rp.${vehicle.rate_per_km.toLocaleString()}/km`;
    },
    []
  );

  const vehicleOptions = useFetchOptions(
    "http://localhost:8080/api/vehicle",
    formatVehicleLabel
  );

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
        center: [106.8456, -6.2088], // Jakarta
        maxBounds: [
          [95.0, -11.0],
          [141.0, 6.1],
        ],
      });

      mapRef.current.scrollZoom.enable();
      mapRef.current.doubleClickZoom.enable();

      const handleClick = (e: mapboxgl.MapMouseEvent) => {
        const { lng, lat } = e.lngLat;
        const type = selectingPoint === "start" ? "start" : "end";

        const markerColor = type === "start" ? "#0ebdf6" : "#ffa7a7";

        // Set state
        if (type === "start") {
          setStartPoint({ lng, lat });
          setPickupLocation(`Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`);
        } else {
          setEndPoint({ lng, lat });
          setDestination(`Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`);
        }

        // Remove existing marker
        if (markerRef.current[type]) markerRef.current[type]!.remove();

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div style="
              background-color: ${markerColor};
              color: white;
              padding: 8px 12px;
              border-radius: 8px;
              font-size: 14px;
              font-weight: bold;
              text-align: center;
              box-shadow: 0px 4px 8px rgba(0,0,0,0.3);
              border: 2px solid white;
              letter-spacing: 0.5px;
              min-width: 100px;
          ">
              ${type === "start" ? "🚀 Keberangkatan" : "📍 Tujuan"}
          </div>`
        );

        // Add new marker with popup
        markerRef.current[type] = new mapboxgl.Marker({ color: markerColor })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(mapRef.current!);

        // Fly to selected point
        mapRef.current!.flyTo({
          center: [lng, lat],
          zoom: 15,
        });
      };

      mapRef.current.on("click", handleClick);

      return () => {
        mapRef.current?.off("click", handleClick);
        mapRef.current?.remove();
        mapRef.current = null;
      };
    }
  }, [ref, selectingPoint]);

  const fetchRoute = async () => {
    if (!startPoint || !endPoint) return;
    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${startPoint.lng},${startPoint.lat};${endPoint.lng},${endPoint.lat}?geometries=geojson&overview=full&access_token=${MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();

      if (data.routes.length > 0) {
        const newRoute: GeoJSON.LineString = data.routes[0].geometry;
        const distanceInKm = parseFloat(
          (data.routes[0].distance / 1000).toFixed(2)
        );

        const estimatedHours = distanceInKm / 40;
        const estimatedMinutes = Math.ceil(estimatedHours * 60);
        // const durationInMinutes = Math.ceil(data.routes[0].duration / 60);
        const hours = Math.floor(estimatedMinutes / 60);
        const minutes = estimatedMinutes % 60;
        const formattedDuration =
          hours > 0 ? `${hours} jam ${minutes} menit` : `${minutes} menit`;

        setRoute(newRoute);
        setDistance(distanceInKm);
        setDuration(formattedDuration);

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
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    setSuggestions: React.Dispatch<React.SetStateAction<Place[]>>,
    type: "start" | "end"
  ) => {
    const coordinates = {
      lng: place.geometry.coordinates[0],
      lat: place.geometry.coordinates[1],
    };
    setPoint(coordinates);
    setInputValue(place.place_name);
    setSuggestions([]);

    if (markerRef.current[type]) markerRef.current[type]!.remove();
    const markerColor = type === "start" ? "#0ebdf6" : "#ffa7a7";
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<div style="
          background-color: ${markerColor};
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: bold;
          text-align: center;
          box-shadow: 0px 4px 8px rgba(0,0,0,0.3);
          border: 2px solid white;
          letter-spacing: 0.5px;
          min-width: 100px;
      ">
          ${type === "start" ? "🚀 Keberangkatan" : "📍 Tujuan"}
      </div>`
    );

    markerRef.current[type] = new mapboxgl.Marker()
      .setLngLat([coordinates.lng, coordinates.lat])
      .setPopup(popup)
      .addTo(mapRef.current!);

    markerRef.current[type]!.togglePopup();

    mapRef.current!.flyTo({
      center: [coordinates.lng, coordinates.lat],
      zoom: 15,
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
        mapRef.current.fitBounds(bounds, { padding: 200, maxZoom: 18 });
      }
    }
  }, [startPoint, endPoint]);

  // zustand
  const { delivery, setDelivery, setAllDelivery, resetDelivery } =
    useDeliveryStore();
  const [formData, setFormData] = [delivery, setAllDelivery];
  const state = useDeliveryStore.getState();
  console.log(state.delivery);
  const { deliveryPrice, loading, error } = useDeliveryCalculation(
    distance,
    formData.vehicle_id
  );

  const handleSubmit = () => {};

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setDelivery({
      [name]: value,
    });
  };

  const clearForm = () => {
    setFormData(formData);

    setStartPoint(null);
    setEndPoint(null);
    setRoute(null);
    setDistance(null);
    setDuration(null);
    setPickupLocation("");
    setDestination("");

    if (markerRef.current.start) markerRef.current.start.remove();
    if (markerRef.current.end) markerRef.current.end.remove();

    if (mapRef.current?.getSource("route")) {
      mapRef.current.removeLayer("route");
      mapRef.current.removeSource("route");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    resetDelivery();
    goBack();
    console.log(
      "Transaction state after reset:",
      useDeliveryStore.getState().delivery
    );
  };

  const handlePlaceSelect = (place: Place) => {
    setStartLocation(place.place_name);
  };

  return (
    <form className="px-5 space-y-5 text-sm flex flex-col justify-center rounded-none shadow-none">
      <SubTitle
        subTitle="Form Tambah Pengiriman"
        className="text-center mt-6"
      />
      <SelectComponent
        label="Jenis Muatan"
        placeholder="Pilih jenis barang"
        name="load_type"
        value={formData.load_type}
        onChange={handleChange}
        options={[
          {
            value: "consumer_goods",
            label: "Barang Konsumen (Consumer Goods)",
          },
          { value: "building_materials", label: "Material Bangunan" },
          { value: "industrial_goods", label: "Barang Industri" },
          { value: "agricultural_products", label: "Hasil Pertanian" },
          { value: "livestock", label: "Ternak" },
          { value: "chemicals", label: "Bahan Kimia" },
          { value: "electronics", label: "Elektronik" },
          { value: "furniture", label: "Furniture" },
          { value: "automotive_parts", label: "Suku Cadang Otomotif" },
          { value: "waste_materials", label: "Limbah / Barang Bekas" },
          { value: "others", label: "Lainnya" },
        ]}
      />
      <InputComponent
        label="Muatan"
        placeholder="AC 2PK, Mesin Cuci, Sofa L"
        type="text"
        name="load"
        value={formData.load}
        onChange={handleChange}
      />
      <InputComponent
        label="Jumlah Muatan"
        placeholder="Masukkan jumlah unit, misal: 3"
        type="text"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
      />
      <InputComponent
        label="Berat Muatan"
        type="number"
        placeholder="Masukkan berat total dalam kg"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
      />
      <SelectComponent
        label="Driver"
        placeholder="Pilih driver yang akan ditugaskan"
        name="driver_id"
        options={driverOptions}
        value={formData.driver_id}
        onChange={handleChange}
      />
      <SelectComponent
        label="Kendaraan"
        placeholder="Pilih kendaraan yang tersedia"
        name="vehicle_id"
        options={vehicleOptions}
        value={formData.vehicle_id}
        onChange={handleChange}
      />

      <InputComponent
        label="Alamat Penjemputan"
        placeholder="Jl. ABC No.10, Jakarta Pusat"
        type="textarea"
        name="pickup_address"
        value={formData.pickup_address}
        onChange={handleChange}
      />
      <div>
        <SearchLocationInput
          placeholder="cari alamat"
          value={startLocation}
          onSelectPlace={handlePlaceSelect}
          mapRef={mapRef}
        />
        <div id="map" className="h-full"></div>
      </div>
      <div className="flex w-full gap-3">
        <InputLatLang
          placeholder="latitude"
          disabled={true}
          value={startPoint ? startPoint.lat.toString() : ""}
        />
        <InputLatLang
          placeholder="longitude"
          disabled={true}
          value={startPoint ? startPoint.lng.toString() : ""}
        />
        <button
          type="button"
          onClick={() => setSelectingPoint("start")}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <MapPin size={20} />
        </button>
      </div>
      <InputComponent
        label="Alamat Tujuan"
        placeholder="Pergudangan ABC, Bekasi Timur"
        type="textarea"
        name="destination_address"
        value={formData.destination_address}
        onChange={handleChange}
      />
      <div>
        <SearchLocationInput
          placeholder="cari alamat"
          value={startLocation}
          onSelectPlace={handlePlaceSelect}
          mapRef={mapRef}
        />
        <div id="map" className="h-full"></div>
      </div>
      <div className="flex w-full gap-3">
        <InputLatLang
          placeholder="latitude"
          disabled={true}
          value={endPoint ? endPoint.lat.toString() : ""}
        />
        <InputLatLang
          placeholder="longitude"
          disabled={true}
          value={endPoint ? endPoint.lng.toString() : ""}
        />
        <button
          type="button"
          onClick={() => setSelectingPoint("end")}
          className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          <MapPin size={20} />
        </button>
      </div>
      <div className="space-y-4">
        <InputComponent
          label="Jarak"
          disabled={true}
          value={distance != null ? `${distance} Km` : ""}
        />
        <InputComponent
          label="Perkiraan Waktu"
          disabled={true}
          value={duration ?? ""}
        />
      </div>
      <InputComponent
        label="Tanggal Pengiriman"
        type="date"
        name="delivery_date"
        value={formData.delivery_date}
        onChange={handleChange}
      />
      <InputComponent
        label="Batas Pengiriman"
        type="date"
        name="delivery_deadline_date"
        value={formData.delivery_deadline_date}
        onChange={handleChange}
      />
      <InputComponent
        className="w-60"
        label="Biaya Pengiriman"
        name="delivery_cost"
        value={
          loading
            ? "Menghitung..."
            : isNaN(deliveryPrice)
            ? "0"
            : `Rp ${deliveryPrice.toLocaleString("id-ID")}`
        }
        disabled={true}
      />
      <div className="flex justify-center w-full gap-3 py-5">
        <ButtonComponent
          variant="back"
          label="Kembali"
          className="w-full"
          type="button"
          onClick={handleCancel}
        />
        <ButtonComponent
          variant="undo"
          label="Ulangi"
          onClick={clearForm}
          className="w-full"
        />
        <ButtonComponent
          variant="save"
          label="Simpan"
          className="w-full"
          onClick={goToTransactionPages}
        />
      </div>
    </form>
  );
});

export default AddDeliveryForm;
