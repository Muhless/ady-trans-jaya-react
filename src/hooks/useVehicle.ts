import { fetchVehicles } from "@/api/vehicle";
import { useState, useEffect } from "react";

export interface Vehicle {
  id: number;
  name: string;
  phone: string;
  address: string;
  status: string;
  photo?: string;
  username: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export function useVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await fetchVehicles();
        if (!Array.isArray(data)) {
          throw new Error("Gagal mengambil data pengemudi");
        }
        setVehicles(data);
      } catch (err: any) {
        setError(
          err.message || "Terjadi kesalahan saat mengambil data pengemudi"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  return { vehicles, setVehicles, loading, setLoading, error, setError };
}
