import React, { forwardRef, useEffect, useRef, useState } from "react";
import { InputComponent } from "../input/Input";
import ButtonComponent from "../button/Index";
import SubTitle from "../SubTitle";
import SelectComponent from "../input/Select";
import useNavigationHooks from "../../hooks/useNavigation";
import mapboxgl from "mapbox-gl";
import { useDeliveryCalculation } from "../../hooks/useDeliveryCost";
import { Delivery, useDeliveryStore } from "../../stores/deliveryStore";
import SearchLocationInput from "../input/SearchLocation";
import { ArrowLeft } from "lucide-react";
import { useTransactionStore } from "../../stores/transactionStore";
import ConfirmDialog from "../common/ConfirmDialog";
import { Button } from "../ui/button";
import { useDeliveryItemStore } from "@/stores/deliveryItemStore";
import DatePickerComponent from "../common/DatePicker";
import { toast } from "sonner";
import { useAvailableOptions } from "@/hooks/useAvailableOptionData";
import { CoordinateInput } from "../input/CoordinatInput";
import ItemsCardList from "../card/delivery/DeliveryItemCard";

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
  const { goBack, goToAddTransaction } = useNavigationHooks();
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<{
    start: mapboxgl.Marker | null;
    destination: mapboxgl.Marker | null;
  }>({ start: null, destination: null });

  const [startPoint, setStartPoint] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [destinationPoint, setDestinationPoint] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [route, setRoute] = useState<GeoJSON.LineString | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | string | null>(null);
  const [selectingPoint, setSelectingPoint] = useState<string>("start");
  const [startLocation, setStartLocation] = React.useState<string>("");
  const [destinationLocation, setDestinationLocation] =
    React.useState<string>("");
  const { driverOptions, vehicleOptions } = useAvailableOptions();

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
        zoom: 12,
        maxBounds: [
          [95.0, -11.0],
          [141.0, 6.1],
        ],
      });

      mapRef.current.scrollZoom.enable();
      mapRef.current.doubleClickZoom.enable();

      const handleClick = (e: mapboxgl.MapMouseEvent) => {
        const { lng, lat } = e.lngLat;

        if (selectingPoint === "start") {
          setStartPoint({ lng, lat });

          if (markerRef.current.start) markerRef.current.start.remove();
          markerRef.current.start = new mapboxgl.Marker({ color: "#3b82f6" })
            .setLngLat([lng, lat])
            .addTo(mapRef.current!);
        } else if (selectingPoint === "destination") {
          setDestinationPoint({ lng, lat });

          if (markerRef.current.destination)
            markerRef.current.destination.remove();
          markerRef.current.destination = new mapboxgl.Marker({
            color: "#ef4444",
          })
            .setLngLat([lng, lat])
            .addTo(mapRef.current!);
        }

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
    if (!startPoint || !destinationPoint) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${startPoint.lng},${startPoint.lat};${destinationPoint.lng},${destinationPoint.lat}?geometries=geojson&overview=full&access_token=${MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const newRoute = route.geometry;

        const totalDistanceInKm = parseFloat(
          (route.distance / 1000).toFixed(2)
        );

        const totalDurationInSeconds = route.duration;
        const totalDurationInMinutes = Math.ceil(totalDurationInSeconds / 60);

        const hours = Math.floor(totalDurationInMinutes / 60);
        const minutes = totalDurationInMinutes % 60;
        const formattedDuration =
          hours > 0 ? `${hours} jam ${minutes} menit` : `${minutes} menit`;

        setRoute(newRoute);
        setDistance(totalDistanceInKm);
        setDuration(formattedDuration);

        const map = mapRef.current;
        if (map) {
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

          const bounds = new mapboxgl.LngLatBounds();
          bounds.extend([startPoint.lng, startPoint.lat]);
          bounds.extend([destinationPoint.lng, destinationPoint.lat]);

          if (map.isStyleLoaded()) {
            map.fitBounds(bounds, { padding: 50, maxZoom: 18 });
          }
        }

        console.log("Route calculation:", {
          totalDistance: totalDistanceInKm,
          totalDuration: formattedDuration,
          rawDuration: totalDurationInSeconds,
        });
      } else {
        console.error("No routes found in API response");
        setDistance(null);
        setDuration(null);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
      calculateManualDistance();
    }
  };

  const calculateManualDistance = () => {
    if (!startPoint || !destinationPoint) return;

    const getDistanceBetweenPoints = (lat1, lon1, lat2, lon2) => {
      const R = 6371;
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    const totalDistance = getDistanceBetweenPoints(
      startPoint.lat,
      startPoint.lng,
      destinationPoint.lat,
      destinationPoint.lng
    );

    const estimatedHours = totalDistance / 40;
    const estimatedMinutes = Math.ceil(estimatedHours * 60);
    const hours = Math.floor(estimatedMinutes / 60);
    const minutes = estimatedMinutes % 60;
    const formattedDuration =
      hours > 0 ? `${hours} jam ${minutes} menit` : `${minutes} menit`;

    setDistance(parseFloat(totalDistance.toFixed(2)));
    setDuration(formattedDuration);

    console.log("Manual calculation:", {
      totalDistance: totalDistance.toFixed(2),
      estimatedDuration: formattedDuration,
    });
  };

  useEffect(() => {
    if (startPoint && destinationPoint) {
      fetchRoute().catch((error) => {
        console.warn("Mapbox API failed, using manual calculation:", error);
        calculateManualDistance();
      });
    } else {
      setDistance(null);
      setDuration(null);
    }
  }, [startPoint, destinationPoint]);

  const displayDistance =
    distance !== null && !isNaN(distance) ? `${distance} Km` : "0 Km";
  const displayDuration =
    duration && duration !== "NaN menit" ? duration : "0 Menit";

  const { delivery, setDelivery, setAllDelivery, resetDelivery } =
    useDeliveryStore();
  const items = useDeliveryItemStore((state) => state.items);

  const totalWeight = items.reduce((sum, item) => sum + (item.weight || 0), 0);

  useEffect(() => {
    const totalWeight = items.reduce(
      (sum, item) => sum + (item.weight || 0),
      0
    );
    setDelivery({
      total_weight: totalWeight,
    });
  }, [items]);

  const [formData, setFormData] = [delivery, setAllDelivery];

  const { deliveryPrice, loading } = useDeliveryCalculation(
    distance,
    formData.vehicle_id
  );
  const { addDeliveryToTransaction, editingDelivery, clearEditingDelivery } =
    useTransactionStore();

  const generateDeliveryCode = (): string => {
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomPart = Math.floor(100 + Math.random() * 900);
    return `ATJ-${datePart}-${randomPart}`;
  };

  const handleSubmitDelivery = (e: React.FormEvent) => {
    e?.preventDefault();

    try {
      if (!delivery.driver_id) {
        toast.error("Silakan pilih pengemudi terlebih dahulu!");
        return;
      }

      if (!delivery.vehicle_id) {
        toast.error("Silakan pilih kendaraan terlebih dahulu!");
        return;
      }

      if (!delivery.pickup_address || delivery.pickup_address.trim() === "") {
        toast.error("Silakan isi alamat penjemputan terlebih dahulu!");
        return;
      }

      if (!startPoint) {
        toast.error("Silakan tentukan koordinat pengambilan terlebih dahulu!");
        return;
      }

      if (
        !delivery.destination_address ||
        delivery.destination_address.trim() === ""
      ) {
        toast.error("Silakan isi alamat tujuan terlebih dahulu!");
        return;
      }

      if (!destinationPoint) {
        toast.error("Silakan tentukan koordinat tujuan terlebih dahulu!");
        return;
      }

      if (!deliveryDate) {
        toast.error("Silakan pilih tanggal pengiriman terlebih dahulu!");
        return;
      }

      // ✅ PERBAIKAN: Gunakan delivery.items dari store, bukan items dari state lokal
      const deliveryItems = delivery.items || [];

      // Validasi items
      if (deliveryItems.length === 0) {
        toast.error("Silakan tambahkan setidaknya satu item untuk dikirim!");
        return;
      }

      const defaultDate = new Date().toISOString();
      const formattedDeliveryDate = deliveryDate
        ? deliveryDate.toISOString()
        : defaultDate;

      // ✅ PERBAIKAN: Hitung dari delivery.items
      const totalItems = deliveryItems.length;
      const totalWeightCalculated = deliveryItems.reduce(
        (sum, item) => sum + item.weight * item.quantity,
        0
      );

      const payload: Delivery = {
        ...delivery,
        id: undefined, // akan di-generate otomatis di addDelivery
        driver_id: Number(delivery.driver_id),
        vehicle_id: Number(delivery.vehicle_id),
        total_item: totalItems,
        total_weight: totalWeightCalculated,
        delivery_date: formattedDeliveryDate,
        delivery_status: "menunggu persetujuan",
        delivery_code: generateDeliveryCode(),
        items: deliveryItems, // ✅ PERBAIKAN: Gunakan deliveryItems
        pickup_address_lat: startPoint.lat,
        pickup_address_lang: startPoint.lng,
        destination_address_lat: destinationPoint.lat,
        destination_address_lang: destinationPoint.lng,
      };

      console.log("Final payload:", payload);
      console.log("Items being sent:", deliveryItems); // Debug log

      useDeliveryStore.getState().addDelivery(payload);
      addDeliveryToTransaction(payload);
      resetDelivery();

      toast.success("Pengiriman berhasil ditambahkan!", {
        description: `Pengiriman dengan kode ${payload.delivery_code} telah ditambahkan ke transaksi dengan ${totalItems} item.`,
        duration: 3000,
      });

      goToAddTransaction();
    } catch (error: any) {
      console.error("Terjadi kesalahan saat menambahkan pengiriman:", error);

      toast.error("Gagal menambahkan pengiriman!", {
        description:
          error.message ||
          "Terjadi kesalahan tidak terduga. Silakan coba lagi.",
        duration: 5000,
      });
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

  const handleReset = () => {
    setFormData({
      ...formData,
      pickup_address: "",
      destination_address: "",
      pickup_address_lat: null,
      pickup_address_lang: null,
      destination_address_lat: null,
      destination_address_lang: null,
      delivery_date: "",
      delivery_cost: 0,
    });

    setDeliveryDate(null);
    setStartPoint(null);
    setDestinationPoint(null);
    setStartLocation("");
    setDestinationLocation("");

    resetDelivery();

    if (markerRef.current.start) markerRef.current.start.remove();
    if (markerRef.current.destination) markerRef.current.destination.remove();

    if (mapRef.current?.getSource("route")) {
      mapRef.current.removeLayer("route");
      mapRef.current.removeSource("route");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = async () => {
    clearEditingDelivery();
    goBack();
  };

  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>();

  return (
    <form
      id="delivery-form"
      onSubmit={handleSubmitDelivery}
      className="px-5 space-y-5 text-sm flex flex-col justify-center rounded-none shadow-none"
    >
      <SubTitle
        subTitle="Form Tambah Pengiriman"
        className="text-center mt-6 text-2xl"
      />

      <SelectComponent
        label="Pengemudi"
        placeholder="Pilih pengemudi yang akan ditugaskan"
        name="driver_id"
        options={driverOptions}
        value={formData.driver_id}
        onChange={handleChange}
        required={true}
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
        onChange={handleChange}
      />

      <ItemsCardList items={items} />

      <InputComponent
        label="Alamat Penjemputan"
        placeholder="Jl. ABC No.10, Jakarta Pusat"
        type="textarea"
        name="pickup_address"
        value={formData.pickup_address}
        onChange={handleChange}
      />
      <SearchLocationInput
        placeholder="Cari alamat penjemputan"
        value={startLocation}
        onSelectPlace={(place) => setStartLocation(place.place_name)}
        mapRef={mapRef}
      />
      <CoordinateInput
        pointLabel="start"
        latitude={startPoint?.lat || null}
        longitude={startPoint?.lng || null}
        onSelectPoint={() => setSelectingPoint("start")}
        isSelected={selectingPoint === "start"}
        displayLabel="Lokasi Penjemputan"
      />

      <InputComponent
        label="Alamat Tujuan"
        placeholder="Pergudangan ABC, Bekasi Timur"
        type="textarea"
        name="destination_address"
        value={formData.destination_address}
        onChange={handleChange}
      />
      <SearchLocationInput
        placeholder="Cari alamat tujuan"
        value={destinationLocation}
        onSelectPlace={(place) => setDestinationLocation(place.place_name)}
        mapRef={mapRef}
      />
      <CoordinateInput
        pointLabel="end"
        latitude={destinationPoint?.lat || null}
        longitude={destinationPoint?.lng || null}
        onSelectPoint={() => setSelectingPoint("destination")}
        isSelected={selectingPoint === "destination"}
        displayLabel="Lokasi Tujuan"
      />

      <div className="space-y-4">
        <InputComponent
          label="Total Jarak"
          disabled={true}
          value={displayDistance}
        />
        <InputComponent
          label="Perkiraan Waktu"
          disabled={true}
          value={displayDuration}
        />
      </div>

      <DatePickerComponent
        label="Tanggal Pengiriman"
        buttonWidth="w-72"
        selectedDate={deliveryDate}
        disablePastDate={true}
        onDateChange={(date) => {
          setDeliveryDate(date);
          setFormData({
            ...formData,
            delivery_date: date ? date.toISOString() : "",
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
      <InputComponent
        label="Keterangan"
        type="textarea"
        name="note"
        onChange={handleChange}
        value={formData.note}
        placeholder="Tambahkan keterangan"
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
          onClick={handleReset}
        />
        <ConfirmDialog
          trigger={
            <ButtonComponent label="Simpan" variant="save" className="w-full" />
          }
          title="Konfirmasi Simpan"
          description="Apakah Anda yakin ingin menyimpan transaksi ini?"
          onConfirm={(e) => handleSubmitDelivery(e)}
        />
      </div>
    </form>
  );
});

export default AddDeliveryForm;
