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

interface Delivery {
  driver_id: string;
  vehicle_id: string;
  load_type: string;
  load: string;
  quantity: number;
  weight: number;
  vehicle: string;
  pickup_location: string;
  destination: string;
  delivery_date: string;
  delivery_deadline_date: string;
  delivery_status: string;
  delivery_cost: number;
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
  const [formData, setFormData] = useState<Delivery>({
    driver_id: "",
    vehicle_id: "",
    load_type: "",
    load: "",
    quantity: 0,
    weight: 0,
    vehicle: "",
    pickup_location: "",
    destination: "",
    delivery_date: "",
    delivery_deadline_date: "",
    delivery_status: "",
    delivery_cost: 0,
  });

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
  const [deliveryList, setDeliveryList] = useState<Delivery[]>([]);
  const [transaction, setTransaction] = useState(null);
  const { deliveryPrice, loading, error } = useDeliveryCalculation(
    distance,
    formData.vehicle
  );

  const { goToTransactionPages } = useNavigationHooks();
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
        // style: "mapbox://styles/mapbox/dark-v11",
        center: [106.8456, -6.2088], // Jakarta
        // center: [106.6297, -6.1781], // Tangerang
        // zoom: 5,
        maxBounds: [
          [95.0, -11.0],
          [141.0, 6.1],
        ],
      });
      mapRef.current.scrollZoom.enable();
      mapRef.current.doubleClickZoom.enable();
    }
  }, [ref]);

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

  useEffect(() => {
    const stored = localStorage.getItem("newTransaction");
    if (stored) {
      setTransaction(JSON.parse(stored));
    }
  }, []);

  const handleAddDelivery = () => {
    setDeliveryList([
      ...deliveryList,
      {
        driver_id: "",
        vehicle_id: "",
        load_type: "",
        load: "",
        quantity: 0,
        weight: 0,
        vehicle: "",
        pickup_location: "",
        destination: "",
        delivery_date: "",
        delivery_deadline_date: "",
        delivery_status: "",
        delivery_cost: 0,
      },
    ]);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!transaction) return alert("Transaksi tidak ditemukan");

    const finalData = {
      ...(transaction as Record<string, any>),
      delivery: deliveryList,
      total_delivery: deliveryList.length,
    };

    try {
      await axios.post("http://localhost:8080/transaction", finalData);
      alert("Transaksi dan pengiriman berhasil dikirim!");
      localStorage.removeItem("newTransaction");
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data");
    }
  };

  const clearForm = () => {
    setFormData({
      driver_id: "",
      vehicle_id: "",
      load_type: "",
      load: "",
      quantity: 0,
      weight: 0,
      vehicle: "",
      pickup_location: "",
      destination: "",
      delivery_date: "",
      delivery_deadline_date: "",
      delivery_status: "",
      delivery_cost: 0,
    });

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    localStorage.removeItem("newTransaction");
  };

  return (
    <Card className="text-sm flex justify-center items-center rounded-none shadow-none">
      <form onSubmit={handleSubmit} className="mt-4 space-y-6 ">
        <SubTitle subTitle="Form Tambah Pengiriman" className="text-center" />
        <SelectComponent
          label="Jenis Muatan"
          placeholder="Pilih jenis barang"
          name="loadType"
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
          name="driver"
          options={driverOptions}
          value={formData.driver_id}
          onChange={handleChange}
        />
        <SelectComponent
          label="Kendaraan"
          placeholder="Pilih kendaraan yang tersedia"
          name="vehicle"
          options={vehicleOptions}
          value={formData.vehicle}
          onChange={handleChange}
        />
        <div className="relative w-full">
          <InputComponent
            label="Lokasi Penjemputan"
            placeholder="Jl. ABC No.10, Jakarta Pusat"
            type="text"
            name="pickup_location"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              fetchAddressSuggestions(e.target.value, setStartSuggestions);
            }}
          />
          <ul className="absolute left-0 z-10 w-full mt-1 text-sm rounded top-full bg-background">
            {startSuggestions.map((place) => (
              <li
                key={place.id}
                className="p-2 cursor-pointer hover:bg-biru hover:text-background border"
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
        <div className="relative w-full">
          <InputComponent
            label="Lokasi Tujuan"
            placeholder="Pergudangan ABC, Bekasi Timur"
            type="text"
            name="destination"
            value={endAddress}
            onChange={(e) => {
              setEndAddress(e.target.value);
              fetchAddressSuggestions(e.target.value, setEndSuggestions);
            }}
          />
          <ul className="absolute left-0 z-10 w-full mt-1 text-sm rounded top-full bg-background">
            {endSuggestions.map((place) => (
              <li
                key={place.id}
                className="p-2 cursor-pointer hover:bg-biru hover:text-background"
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
          name="deliveryDate"
          value={formData.delivery_date}
          onChange={handleChange}
        />
        <InputComponent
          label="Batas Pengiriman"
          type="date"
          name="deliveryDeadlineDate"
          value={formData.delivery_deadline_date}
          onChange={handleChange}
        />
        <InputComponent
          className="w-60"
          label="Biaya Pengiriman"
          name="deliveryPrice"
          value={
            loading
              ? "Menghitung..."
              : isNaN(deliveryPrice)
              ? "0"
              : `Rp ${deliveryPrice.toLocaleString("id-ID")}`
          }
          disabled={true}
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-center w-full gap-3 py-5">
          <ButtonComponent
            variant="back"
            label="Kembali"
            className="w-full"
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
    </Card>
  );
});

export default AddDeliveryForm;
