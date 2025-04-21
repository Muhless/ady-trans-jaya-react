import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface Driver {
  id: string;
  name: string;
  phone: string;
  address: string;
  status: string;
}

const fetchDriverDetails = async (id: string) => {
  const response = await fetch(`http://localhost:8080/api/driver/${id}`);
  if (!response.ok) {
    throw new Error("Gagal mengambil data driver");
  }
  return response.json();
};

function DriverDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useQuery<Driver, Error>({
    queryKey: ["driverDetails", id],
    queryFn: () => fetchDriverDetails(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div>
      <h2>Detail Driver</h2>
      <p>Nama: {data?.name}</p>
      <p>Telepon: {data?.phone}</p>
      <p>Alamat: {data?.address}</p>
      <p>Status: {data?.status}</p>
    </div>
  );
}

export default DriverDetailPage;
