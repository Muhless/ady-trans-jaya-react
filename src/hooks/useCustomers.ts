import { useEffect, useState } from "react";

export type Customer = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
};

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/customer");
        if (!response.ok) {
          throw new Error("Error fetching customers data");
        }
        const data = await response.json();
        setCustomers(data.data); 
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false); 
      }
    };
    fetchCustomers();
  }, []);

  return { customers, loading, error };
};
