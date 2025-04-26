// hooks/useDeliveryCost.js
import { useState, useEffect } from "react";

export const useDeliveryCost = () => {
  const [vehicleRates, setVehicleRates] = useState({});
  const [cost, setCost] = useState("");

  // Fetch vehicle rates from API
  useEffect(() => {
    const fetchVehicleRates = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/vehicle");
        const data = await response.json();

        // Create a mapping of vehicle type to rate
        const rates = {};
        data.forEach((vehicle) => {
          if (vehicle.type && vehicle.price) {
            rates[vehicle.type.toLowerCase()] = vehicle.price;
          }
        });

        setVehicleRates(rates);
      } catch (error) {
        console.error("Error fetching vehicle rates:", error);
        // Fallback to default rates if API fails
        setVehicleRates({
          pickup: 5000,
          engkel: 7000,
          tronton: 10000,
        });
      }
    };

    fetchVehicleRates();
  }, []);

  // Function to calculate cost based on inputs
  const calculateCost = (distance, formData) => {
    const { weight, deliveryDate, deliveryDeadlineDate, vehicle } = formData;

    if (distance && weight && deliveryDate && deliveryDeadlineDate && vehicle) {
      const berat = parseFloat(weight);
      const tarifPerKg = 2000;

      const vehicleType =
        vehicle.match(/\(([^)]+)\)/)?.[1]?.toLowerCase() || "";

      // Use the fetched rates from API, or fallback to a default
      const tarifPerKm = vehicleRates[vehicleType] || 5000;

      const d1 = new Date(deliveryDate);
      const d2 = new Date(deliveryDeadlineDate);
      const selisihHari = Math.ceil(
        (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)
      );

      let biaya = distance * tarifPerKm + berat * tarifPerKg;

      // Apply urgent delivery surcharge
      if (selisihHari < 2) {
        biaya *= 1.2;
      }

      setCost(`Rp ${biaya.toLocaleString("id-ID")}`);
    } else {
      setCost("");
    }
  };

  return { cost, calculateCost, vehicleRates };
};
