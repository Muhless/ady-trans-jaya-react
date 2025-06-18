import { API_BASE_URL } from "@/apiConfig";
import { useDeliveryStore, Vehicle } from "@/stores/deliveryStore";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useAvailableOptions = () => {
  const [driverOptions, setDriverOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);

  const deliveryList = useDeliveryStore((state) => state.deliveryList);

  const formatVehicleLabel = useCallback(
    (vehicle: Vehicle) =>
      `${
        vehicle.name
      } (${vehicle.type.toUpperCase()}) - Rp.${vehicle.rate_per_km.toLocaleString()}/km`,
    []
  );

  const fetchOptions = useCallback(() => {
    const usedDriverIds = deliveryList.map((d) => d.driver_id).filter(Boolean);
    const usedVehicleIds = deliveryList
      .map((d) => d.vehicle_id)
      .filter(Boolean);

    // Fetch drivers
    axios.get(`${API_BASE_URL}/drivers`).then((res) => {
      const availableDrivers = res.data.data.filter(
        (driver) => driver.status === "tersedia"
      );

      const notUsedDrivers = availableDrivers.filter(
        (driver) => !usedDriverIds.includes(driver.id)
      );

      const options = notUsedDrivers.map((driver) => ({
        label: driver.name,
        value: driver.id,
      }));

      setDriverOptions(options);
    });

    axios
      .get(`${API_BASE_URL}/vehicles`)
      .then((res) => {
        const options = res.data.data
          .filter((vehicle) => vehicle.status === "tersedia")
          .filter((vehicle) => !usedVehicleIds.includes(vehicle.id))
          .map((vehicle) => ({
            label: formatVehicleLabel(vehicle),
            value: vehicle.id,
          }));
        setVehicleOptions(options);
      })
      .catch((err) => console.error("Failed to fetch vehicles", err));
  }, [deliveryList]);

  useEffect(() => {
    fetchOptions();
  }, []);

  useEffect(() => {
    fetchOptions();
  }, [deliveryList]);

  return { driverOptions, vehicleOptions };
};
