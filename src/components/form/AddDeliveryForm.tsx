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
import SearchLocationInput from "../input/SearchLocation";
import { InputLatLang } from "../input/InputLatLang";
import { MapPin } from "lucide-react";
import { useTransactionStore } from "../../stores/transactionStore";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../apiConfig";

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
  const [selectingPoint, setSelectingPoint] = useState<"start" | "end">(
    "start"
  );
  const [startLocation, setStartLocation] = React.useState<string>("");
  const { goBack, goToTransactionPages } = useNavigationHooks();
  const driverOptions = useFetchOptions(`${API_BASE_URL}/driver`);
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
    `${API_BASE_URL}/vehicle`,
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
        center: [106.8456, -6.2088],
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

        const markerColor = type === "start" ? "#3b82f6" : "#ef4444";

        if (type === "start") {
          setStartPoint({ lng, lat });
          setPickupLocation(`Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`);
        } else {
          setEndPoint({ lng, lat });
          setDestination(`Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`);
        }

        if (markerRef.current[type]) markerRef.current[type]!.remove();

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

        markerRef.current[type] = new mapboxgl.Marker({ color: markerColor })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(mapRef.current!);

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

  useEffect(() => {
    if (startPoint) {
      setDelivery({
        pickup_address_lat: startPoint.lat,
        pickup_address_lang: startPoint.lng,
      });
    }
  }, [startPoint]);

  useEffect(() => {
    if (endPoint) {
      setDelivery({
        destination_address_lat: endPoint.lat,
        destination_address_lang: endPoint.lng,
      });
    }
  }, [endPoint]);

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
  const { addDeliveryToTransaction } = useTransactionStore();

  const handleSubmitDelivery = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!delivery.driver_id) {
      alert("Silahkan pilih pengemudi terlebih dahulu.");
      return;
    }

    try {
      const defaultDate = new Date().toISOString();
      const formattedDeliveryDate = delivery.delivery_date
        ? new Date(delivery.delivery_date).toISOString()
        : defaultDate;

      const formattedDeliveryDeadlineDate = delivery.delivery_deadline_date
        ? new Date(delivery.delivery_deadline_date).toISOString()
        : defaultDate;

      const payload = {
        ...delivery,

        id: Number(delivery.id),
        driver_id: Number(delivery.driver_id),
        vehicle_id: Number(delivery.vehicle_id),
        delivery_date: formattedDeliveryDate,
        delivery_deadline_date: formattedDeliveryDeadlineDate,
      };

      addDeliveryToTransaction(payload);
      console.log("Delivery disimpan ke transaksi:", payload);

      resetDelivery();
      goBack();
    } catch (err: any) {
      console.error("Gagal simpan delivery:", err);
      alert(`Gagal menyimpan delivery: ${err.message}`);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    const numberFields = [
      "driver_id",
      "vehicle_id",
      "pickup_address_lat",
      "pickup_address_lang",
      "destination_address_lat",
      "destination_address_lang",
      "delivery_cost",
    ];

    const parsedValue = numberFields.includes(name)
      ? name === "delivery_cost"
        ? parseFloat(value) || 0
        : parseFloat(value) || null
      : value;

    setDelivery({
      ...delivery,
      [name]: parsedValue,
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

  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Batalkan Pengiriman?",
      text: "Semua data akan dihapus dan tidak bisa dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, batalkan",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      resetDelivery();
      goBack();
      console.log(
        "Transaction state after reset:",
        useDeliveryStore.getState().delivery
      );
    }
  };

  const handlePlaceSelect = (place: Place) => {
    setStartLocation(place.place_name);
  };

  return (
    <form
      onSubmit={handleSubmitDelivery}
      className="px-5 space-y-5 text-sm flex flex-col justify-center rounded-none shadow-none"
    >
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
            value: "Barang Konsumen",
            label: "Barang Konsumen",
          },
          { value: "Material Bangunan", label: "Material Bangunan" },
          { value: "Barang Industri", label: "Barang Industri" },
          { value: "Hasil Pertanian", label: "Hasil Pertanian" },
          { value: "Ternak", label: "Ternak" },
          { value: "Bahan Kimia", label: "Bahan Kimia" },
          { value: "Elektronik", label: "Elektronik" },
          { value: "Furniture", label: "Furniture" },
          { value: "Suku Cadang Otomotif", label: "Suku Cadang Otomotif" },
          { value: "Limbah / Barang Bekas", label: "Limbah / Barang Bekas" },
          { value: "Lainnya", label: "Lainnya" },
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
        placeholder="Masukkan jumlah unit, misal: 3 unit"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
      />
      <InputComponent
        label="Berat Muatan"
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
          placeholder={`Cari alamat ${
            selectingPoint === "start" ? "penjemputan" : "tujuan"
          }`}
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
          placeholder="langitude"
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
      <div className="flex w-full gap-3">
        <InputLatLang
          placeholder="latitude"
          disabled={true}
          value={formData.destination_address_lat}
        />
        <InputLatLang
          placeholder="langitude"
          disabled={true}
          value={formData.destination_address_lang}
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
          type="reset"
          className="w-full"
          onClick={clearForm}
        />
        <ButtonComponent
          variant="save"
          label="Simpan"
          type="submit"
          className="w-full"
          onClick={goToTransactionPages}
        />
      </div>
    </form>
  );
});

export default AddDeliveryForm;
