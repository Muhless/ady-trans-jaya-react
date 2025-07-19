import { useDeliveryStore, Vehicle } from "@/stores/deliveryStore";
import { useCallback, useEffect, useState } from "react";

export const useAllOptions = () => {
  const [driverOptions, setDriverOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);

  const { drivers, vehicles } = useDeliveryStore();

  const formatVehicleLabel = useCallback(
    (vehicle: Vehicle) =>
      `${
        vehicle.name
      } (${vehicle.type.toUpperCase()}) - Rp.${vehicle.rate_per_km.toLocaleString()}/km`,
    []
  );

  useEffect(() => {
    setDriverOptions(
      drivers.map((d) => ({
        label: d.name,
        value: d.id,
      }))
    );

    setVehicleOptions(
      vehicles.map((v) => ({
        label: formatVehicleLabel(v),
        value: v.id,
      }))
    );
  }, [drivers, vehicles, formatVehicleLabel]);

  return { driverOptions, vehicleOptions };
};
