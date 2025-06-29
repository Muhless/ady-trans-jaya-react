import { deleteCustomer } from "@/api/customer";
import { API_BASE_URL } from "./../apiConfig";
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

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/customers`);
      if (!response.ok) {
        throw new Error("Error fetching customers data");
      }
      const data = await response.json();
      setCustomers(data.data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const deleteCustomerById = async (id: number, onSuccess?: () => void) => {
    try {
      setLoading(true);
      setError(null);

      await deleteCustomer(id);

      // Remove customer from local state
      setCustomers((prev) => prev.filter((customer) => customer.id !== id));

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.error || "Gagal menghapus pelanggan");
    } finally {
      setLoading(false);
    }
  };

  const refreshCustomers = () => {
    fetchCustomers();
  };

  return {
    customers,
    loading,
    error,
    setCustomers,
    deleteCustomerById,
    refreshCustomers,
    setError,
    setLoading,
  };
};

export const useDeleteCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: number, onSuccess?: () => void) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCustomer(id);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.error || "Gagal menghapus pelanggan");
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading, error };
};
