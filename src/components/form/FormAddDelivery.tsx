import React, { forwardRef, useCallback, useRef } from "react";
import { InputComponent } from "../input/Input";
import ButtonComponent from "../button/Index";
import SubTitle from "../SubTitle";
import SelectComponent from "../input/Select";
import DateInputComponent from "../input/Date";
import useNavigationHooks from "../../hooks/useNavigation";
import Card from "../card";
import { useFetchOptions } from "../../hooks/useFetchOptions";
import { InputValue } from "../input/InputValue";
import { useFetchAddressSuggestionHooks } from "../../hooks/useFetchAddressSuggestion";
import { useForm } from "../../hooks/useForm";
import { useFetchRouteHooks } from "../../hooks/useFetchRoute";
import { useSelectAddressHooks } from "../../hooks/useSelectAddress";

const mapContainerRef = useRef<HTMLDivElement>(null);
const FormAddDelivery = forwardRef<HTMLDivElement>((_) => {
  const {
    route,
    setRoute,
    distance,
    setDistance,
    duration,
    setDuration,
    fetchRoute,
    startPoint,
    setStartPoint,
    endPoint,
    setEndPoint,
  } = useFetchRouteHooks(mapContainerRef);
  const {
    startSuggestions,
    setStartSuggestions,
    endSuggestions,
    setEndSuggestions,
    fetchAddressSuggestions,
  } = useFetchAddressSuggestionHooks();
  const { goToAddDelivery } = useNavigationHooks();
  const {
    handleChange,
    handleChangeSelect,
    handleDateChange,
    handleSubmit,
    formData,
    address,
    setAddress,
    endAddress,
    setEndAddress,
  } = useForm();
  const { handleSelectAddress, markerRef, mapRef } = useSelectAddressHooks();

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
    <Card className="bg-secondary">
      <form onSubmit={handleSubmit} className="px-10 mt-4 space-y-5">
        <SubTitle subTitle="Form Tambah Pengiriman" className="text-center" />
        {/* form */}
        <SelectComponent
          label="Jenis Muatan"
          name="load_type"
          value={formData.loadType}
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
          type="text"
          name="load"
          value={formData.load}
          onChange={handleChange}
        />
        <InputComponent
          label="Jumlah Muatan"
          type="text"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        <InputValue
          label="Berat Muatan"
          name="weight"
          weightName="weight"
          unitName="unit"
          weight={formData.weight}
          unit={formData.unit}
          onChange={handleChange}
        />
        <SelectComponent
          label="Driver"
          name="driver"
          options={driverOptions}
          value={formData.driver}
          onChange={handleChange}
        />
        <SelectComponent
          label="Kendaraan"
          name="vehicle"
          options={vehicleOptions}
          value={formData.vehicle}
          onChange={handleChangeSelect}
        />
        <div className="relative w-full">
          <InputComponent
            label="Lokasi Penjemputan"
            type="textarea"
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
            type="textarea"
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

        <DateInputComponent
          label="Tanggal Pengiriman"
          name="delivery_date"
          value={formData.deliveryDate}
          onChange={(date) => handleDateChange("deliveryDate", date)}
        />
        <DateInputComponent
          label="Batas Pengiriman"
          name="delivery_deadline_date"
          value={formData.deliveryDeadlineDate}
          onChange={(date) => handleDateChange("deliveryDeadlineDate", date)}
        />
        {/* TODO: Toral didapat dari harga sewa mobil x jarak */}
        <InputComponent
          className="w-60"
          label="Total"
          name="total"
          value={formData.total}
          disabled={true}
        />
        {distance !== null && duration !== null && (
          <div className="p-2 space-y-2 text-sm bg-gray-300 rounded-md">
            <div className="flex justify-between">
              <p>Jarak</p>
              <p className="w-56">
                : <strong>{distance} Km</strong>
              </p>
            </div>
            <div className="flex justify-between">
              <p>Perkiraan waktu</p>
              <p className="w-56">
                : <strong>{duration}</strong>
              </p>
            </div>
          </div>
        )}
        <div className="flex justify-center w-full gap-3 p-2">
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
