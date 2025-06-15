import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
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
import { Delivery, useDeliveryStore } from "../../stores/deliveryStore";
import SearchLocationInput from "../input/SearchLocation";
import { InputLatLang } from "../input/InputLatLang";
import { ArrowLeft, MapPin } from "lucide-react";
import { useTransactionStore } from "../../stores/transactionStore";
import { API_BASE_URL } from "../../apiConfig";
import ConfirmDialog from "../common/ConfirmDialog";
import { Button } from "../ui/button";
import { useDeliveryItemStore } from "@/stores/deliveryItemStore";
import DatePickerComponent from "../common/DatePicker";

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

type Driver = {
  id: number;
  name: string;
  status: string;
};

type Vehicle = {
  id: number;
  name: string;
  status: string;
  type: string;
  rate_per_km: number;
};

const AddDeliveryForm = forwardRef<HTMLDivElement>((_, ref) => {
  const { goBack, goToAddTransaction } = useNavigationHooks();
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
  const [selectingPoint, setSelectingPoint] = useState<"start" | "end">(
    "start"
  );
  const [startLocation, setStartLocation] = React.useState<string>("");
  const [driverOptions, setDriverOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);

  const formatVehicleLabel = useCallback(
    (vehicle: Vehicle) =>
      `${
        vehicle.name
      } (${vehicle.type.toUpperCase()}) - Rp.${vehicle.rate_per_km.toLocaleString()}/km`,
    []
  );

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/drivers`)
      .then((res) => {
        const options = res.data.data
          .filter((driver) => driver.status === "tersedia")
          .map((driver) => ({
            label: driver.name,
            value: driver.id,
          }));
        setDriverOptions(options);
        // useTransactionStore.getState().setDrivers(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch drivers", err);
      });

    axios
      .get(`${API_BASE_URL}/vehicles`)
      .then((res) => {
        console.log("Data kendaraan:", res.data);
        const options = res.data.data
          .filter((vehicle) => vehicle.status === "tersedia")
          .map((vehicle) => ({
            label: formatVehicleLabel(vehicle),
            value: vehicle.id,
          }));
        setVehicleOptions(options);
        // useTransactionStore.getState().setVehicles(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch vehicles", err);
      });
  }, []);

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

        markerRef.current[type] = new mapboxgl.Marker({ color: markerColor })
          .setLngLat([lng, lat])
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

  const { delivery, setDelivery, setAllDelivery, resetDelivery } =
    useDeliveryStore();
  const items = useDeliveryItemStore((state) => state.items);

  const totalWeight = items.reduce((sum, item) => sum + (item.weight || 0), 0);

  const [formData, setFormData] = [delivery, setAllDelivery];

  const { deliveryPrice, loading } = useDeliveryCalculation(
    distance,
    formData.vehicle_id
  );
  const {
    addDeliveryToTransaction,
    editingDelivery,
    clearEditingDelivery,
    updateDeliveryInTransaction,
  } = useTransactionStore();

  const generateDeliveryCode = (): string => {
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomPart = Math.floor(100 + Math.random() * 900);
    return `DEL-${datePart}-${randomPart}`;
  };

  const handleSubmitDelivery = (e: React.FormEvent) => {
    e.preventDefault();

    if (!delivery.driver_id) {
      alert("Silahkan pilih pengemudi terlebih dahulu.");
      return;
    }
    if (!delivery.vehicle_id) {
      alert("Silahkan pilih Kendaraan terlebih dahulu.");
      return;
    }

    const defaultDate = new Date().toISOString();
    const formattedDeliveryDate = deliveryDate
      ? deliveryDate.toISOString()
      : defaultDate;

    const formattedDeliveryDeadlineDate = deliveryDeadlineDate
      ? deliveryDeadlineDate.toISOString()
      : defaultDate;

    const items = useDeliveryItemStore.getState().items;

    const payload: Delivery = {
      ...delivery,
      id: Number(delivery.id),
      driver_id: Number(delivery.driver_id),
      vehicle_id: Number(delivery.vehicle_id),
      delivery_date: formattedDeliveryDate,
      delivery_deadline_date: formattedDeliveryDeadlineDate,
      delivery_status: "menunggu persetujuan",
      total_item: items.length,
      delivery_code: generateDeliveryCode(),
      items: items,
    };

    addDeliveryToTransaction(payload);
    useDeliveryStore
      .getState()
      .updateDriverStatus(delivery.driver_id!, "tidak tersedia");

    useDeliveryStore
      .getState()
      .updateVehicleStatus(delivery.vehicle_id!, "tidak tersedia");

    console.log(useDeliveryStore.getState().delivery);
    resetDelivery();
    goToAddTransaction();
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
    setDeliveryDate(null);
    setDeliveryDeadlineDate(null);
    resetDelivery();

    if (markerRef.current.start) markerRef.current.start.remove();
    if (markerRef.current.end) markerRef.current.end.remove();

    if (mapRef.current?.getSource("route")) {
      mapRef.current.removeLayer("route");
      mapRef.current.removeSource("route");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (editingDelivery) {
      setFormData(editingDelivery);
    }
  }, [editingDelivery]);

  const handleCancel = async () => {
    clearEditingDelivery();
    goBack();
  };

  const handlePlaceSelect = (place: Place) => {
    setStartLocation(place.place_name);
  };

  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>();
  const [deliveryDeadlineDate, setDeliveryDeadlineDate] = useState<
    Date | undefined
  >();

  return (
    <form
      onSubmit={handleSubmitDelivery}
      className="px-5 space-y-5 text-sm flex flex-col justify-center rounded-none shadow-none"
    >
      <SubTitle
        subTitle="Form Tambah Pengiriman"
        className="text-center mt-6 text-2xl"
      />
      <SelectComponent
        label="Jenis Barang"
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
        label="Jumlah Barang"
        disabled={true}
        name="total_item"
        value={items.length}
        onChange={() => {}}
      />
      <InputComponent
        label="Total Berat"
        disabled={true}
        name="total_weight"
        value={totalWeight}
        onChange={() => {}}
      />
      <SelectComponent
        label="Pengemudi"
        placeholder="Pilih pengemudi yang akan ditugaskan"
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

      <DatePickerComponent
        label="Tanggal Pengiriman"
        selectedDate={deliveryDate}
        onDateChange={(date) => {
          setDeliveryDate(date);
          setFormData({
            ...formData,
            delivery_date: date ? date.toISOString() : "",
          });
        }}
      />

      <DatePickerComponent
        label="Batas Waktu Pengiriman"
        selectedDate={deliveryDeadlineDate}
        onDateChange={(date) => {
          setDeliveryDeadlineDate(date);
          setFormData({
            ...formData,
            delivery_deadline_date: date ? date.toISOString() : "",
          });
        }}
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
        <ConfirmDialog
          trigger={
            <Button className="w-full">
              <ArrowLeft /> Kembali
            </Button>
          }
          title="Kembali"
          description="Yakin ingin membatalkan tambah pengiriman?"
          onConfirm={handleCancel}
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
        />
      </div>
    </form>
  );
});

export default AddDeliveryForm;
