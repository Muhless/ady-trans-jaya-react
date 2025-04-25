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
import { useMapboxHook } from "../../hooks/useMapbox";

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
const valueUnitOptions = [
  { value: "kg", label: "kg" },
  { value: "ton", label: "ton" },
  { value: "m3", label: "m3" },
  { value: "liter", label: "liter" },
];

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

const FormAddDelivery = forwardRef<HTMLDivElement>((_, ref) => {
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

  const { goToAddDelivery } = useNavigationHooks();
  const driverOptions = useFetchOptions("http://localhost:8080/api/driver");
  const formatVehicleLabel = useCallback(
    (vehicle: { name: string; type: string; license_plat: string }) => {
      return `${vehicle.name} - (${vehicle.type.toUpperCase()}) - ${
        vehicle.license_plat
      }`;
    },
    []
  );
  const vehicleOptions = useFetchOptions(
    "http://localhost:8080/api/vehicle",
    formatVehicleLabel
  );

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  useMapboxHook(mapContainerRef);

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
        zoom: 1,
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
      zoom: 10,
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

  const [formData, setFormData] = useState({
    loadType: "",
    load: "",
    quantity: "",
    weight: "",
    unit: "",
    driver: "",
    vehicle: "",
    deliveryDate: null as Date | null,
    deliveryDeadlineDate: null as Date | null,
    total: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (
      name === "delivery_deadline_date" &&
      event.target instanceof HTMLInputElement
    ) {
      const dateValue = new Date(value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: dateValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    if (event.target instanceof HTMLSelectElement) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      pickup_location: address,
      destination: endAddress,
    };
    console.log("Form Data:", finalData);
  };

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Card className="text-sm flex justify-center items-center rounded-none">
      <form onSubmit={handleSubmit} className="px-10 mt-4 space-y-3">
        <SubTitle subTitle="Form Tambah Pengiriman" className="text-center" />
        <SelectComponent
          label="Jenis Muatan"
          placeholder="Pilih jenis barang utama yang dikirim"
          name="load_type"
          value={formData.loadType}
          onChange={handleChangeSelect}
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
          placeholder="Masukkan berat total, misal: 150 kg"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        />
        <SelectComponent
          label="Driver"
          placeholder="Pilih driver yang akan ditugaskan"
          name="driver"
          options={driverOptions}
          value={formData.driver}
          onChange={handleChangeSelect}
        />
        <SelectComponent
          label="Kendaraan"
          placeholder="Pilih kendaraan yang tersedia"
          name="vehicle"
          options={vehicleOptions}
          value={formData.vehicle}
          onChange={handleChangeSelect}
        />
        <div className="relative w-full">
          <InputComponent
            label="Lokasi Penjemputan"
            placeholder="Jl. Merdeka No.10, Jakarta Pusat"
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
            className="w-60"
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
        {distance !== null && duration !== null && (
          <div className="space-y-4">
            <InputComponent
              label="Jarak"
              disabled={true}
              value={`${distance} Km`}
            />
            <InputComponent
              label="Perkiraan Waktu"
              disabled={true}
              value={duration}
            />
          </div>
        )}

        {/* FIXME: Error date */}
        <InputComponent
          label="Tanggal Pengiriman"
          type="date"
          placeholder=""
          name="delivery_date"
          value={formData.deliveryDate}
          onChange={handleChange}
        />
        <InputComponent
          label="Batas Pengiriman"
          type="date"
          placeholder="cihuy"
          name="delivery_deadline_date"
          value={formData.deliveryDeadlineDate}
          onChange={handleChange}
        />
        {/* TODO: Toral didapat dari harga sewa mobil x jarak */}
        <InputComponent
          className="w-60"
          label="Total"
          name="total"
          value={formData.total}
          disabled={true}
        />

        <div className="flex justify-center w-full gap-3 py-5">
          <ButtonComponent variant="back" label="Kembali" className="w-full" />
          <ButtonComponent
            variant="undo"
            label="Ulangi"
            onClick={clearMap}
            className="w-full"
          />
          <ButtonComponent
            variant="save"
            label="Simpan"
            className="w-full"
            onClick={goToAddDelivery}
          />
        </div>
      </form>
    </Card>
  );
});

export default FormAddDelivery;
