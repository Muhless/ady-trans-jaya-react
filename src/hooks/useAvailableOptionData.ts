import { useDeliveryStore, Vehicle } from "@/stores/deliveryStore";
import { useCallback, useEffect, useState } from "react";

export const useAvailableOptions = () => {
  const [driverOptions, setDriverOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);

  const { drivers, vehicles, deliveryList } = useDeliveryStore();

  const formatVehicleLabel = useCallback(
    (vehicle: Vehicle) =>
      `${
        vehicle.name
      } (${vehicle.type.toUpperCase()}) - Rp.${vehicle.rate_per_km.toLocaleString()}/km`,
    []
  );

  useEffect(() => {
    const usedDriverIds = deliveryList.map((d) => d.driver_id).filter(Boolean);
    const usedVehicleIds = deliveryList
      .map((d) => d.vehicle_id)
      .filter(Boolean);

    const availableDrivers = drivers
      .filter((d) => d.status === "tersedia")
      .filter((d) => !usedDriverIds.includes(d.id));

    setDriverOptions(
      availableDrivers.map((d) => ({ label: d.name, value: d.id }))
    );

    const availableVehicles = vehicles
      .filter((v) => v.status === "tersedia")
      .filter((v) => !usedVehicleIds.includes(v.id));

    setVehicleOptions(
      availableVehicles.map((v) => ({
        label: formatVehicleLabel(v),
        value: v.id,
      }))
    );
  }, [drivers, vehicles, deliveryList]);

  useEffect(() => {
    console.log("=== Available Options ===");
    console.log("Drivers in store:", drivers);
    console.log("Filtered driver options:", driverOptions);
  }, [drivers, driverOptions]);

  return { driverOptions, vehicleOptions };
};
