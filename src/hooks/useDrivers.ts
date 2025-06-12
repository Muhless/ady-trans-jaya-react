import { fetchDrivers } from "@/api/driver";
import { useState, useEffect } from "react";

export interface Driver {
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

export function useDrivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const data = await fetchDrivers();
        if (!Array.isArray(data)) {
          throw new Error("Gagal mengambil data pengemudi");
        }
        setDrivers(data);
      } catch (err: any) {
        setError(
          err.message || "Terjadi kesalahan saat mengambil data pengemudi"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDriver();
  }, []);

  return { drivers, setDrivers, loading, setLoading, error, setError };
}
