import { useEffect, useState } from "react";

// Update your useDeliveryCalculation hook with debugging
export const useDeliveryCalculation = (distance, vehicleId) => {
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [ratePerKm, setRatePerKm] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const calculateDeliveryCost = async () => {
      // Add logging to check inputs
      console.log("Calculating delivery cost with:", { distance, vehicleId });
      
      // Don't calculate if we don't have a distance or vehicle selected
      if (!distance || !vehicleId) {
        console.log("Missing required data, setting price to 0");
        setDeliveryPrice(0);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch vehicle details to get the rate_per_km
        console.log("Fetching vehicle data for ID:", vehicleId);
        const response = await fetch(`http://localhost:8080/api/vehicle/${vehicleId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch vehicle data: ${response.status}`);
        }
        
        const responseData = await response.json();
        console.log("Vehicle data received:", responseData);

        const vehicleData = responseData.data || responseData;
        
        // Check if rate_per_km exists and is a number
        const rate = vehicleData.rate_per_km;
        console.log("Rate per KM:", rate, typeof rate);
        
        if (typeof rate !== 'number' || isNaN(rate)) {
          throw new Error("Invalid rate_per_km value received from API");
        }
        
        // Store the rate for reference
        setRatePerKm(rate);
        
        // Calculate the delivery price
        const calculatedPrice = rate * distance;
        console.log("Calculated price:", calculatedPrice);
        
        // Round to nearest whole number
        setDeliveryPrice(Math.round(calculatedPrice));
      } catch (err) {
        console.error("Error calculating delivery cost:", err);
        setError(err.message);
        setDeliveryPrice(0); // Set to 0 on error
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