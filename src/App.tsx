import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./stores/AuthStore";
import { useDeliveryStore } from "./stores/deliveryStore";
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { Toaster } from "sonner";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const setDrivers = useDeliveryStore((state) => state.setDrivers);
  const setVehicles = useDeliveryStore((state) => state.setVehicles);

  useEffect(() => {
    checkAuth();

    const fetchInitialData = async () => {
      try {
        const [driverRes, vehicleRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/drivers`),
          axios.get(`${API_BASE_URL}/vehicles`),
        ]);

        setDrivers(driverRes.data.data);
        setVehicles(vehicleRes.data.data);
      } catch (error) {
        console.error("Gagal memuat data awal:", error);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <>
      <Toaster richColors position="top-center" />
      <AppRoutes />
    </>
  );
}

export default App;
