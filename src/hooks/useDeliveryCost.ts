import { useEffect, useState } from "react";
import { useDeliveryStore } from "../stores/deliveryStore";
import { API_BASE_URL } from "../apiConfig";

export const useDeliveryCalculation = (distance, vehicleId) => {
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [ratePerKm, setRatePerKm] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const calculateDeliveryCost = async () => {
      if (!distance || !vehicleId) {
        setDeliveryPrice(0);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log("Fetching vehicle data for ID:", vehicleId);
        const response = await fetch(`${API_BASE_URL}/vehicle/${vehicleId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch vehicle data: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Vehicle data received:", responseData);

        const vehicleData = responseData.data || responseData;

        const rate = vehicleData.rate_per_km;
        console.log("Rate per KM:", rate, typeof rate);

        if (typeof rate !== "number" || isNaN(rate)) {
          throw new Error("Invalid rate_per_km value received from API");
        }

        setRatePerKm(rate);

        const calculatedPrice = rate * distance;
        console.log("Calculated price:", calculatedPrice);

        setDeliveryPrice(Math.round(calculatedPrice));
        useDeliveryStore.getState().setDelivery({
          delivery_cost: Math.round(calculatedPrice),
        });
      } catch (err) {
        console.error("Error calculating delivery cost:", err);
        setError(err.message);
        setDeliveryPrice(0);
      } finally {
        setLoading(false);
      }
    };

    calculateDeliveryCost();
  }, [distance, vehicleId]);

  return {
    deliveryPrice,
    ratePerKm,
    loading,
    error,
  };
};
