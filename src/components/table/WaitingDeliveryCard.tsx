import React, { useEffect, useState } from "react";
import Card from "../card";
import TableComponent from ".";
import { fetchDeliveries } from "../../api/delivery";

const WaitingDeliveryTable = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getDeliveries = async () => {
      try {
        const data = await fetchDeliveries();
        const ongoing = data.filter(
          (delivery: any) => delivery.status === "ongoing"
        );
        setDeliveries(ongoing);
      } catch (err: any) {
        setError(err.message || "Gagal memuat data pengiriman");
      } finally {
        setLoading(false);
      }
    };

    getDeliveries();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Memuat data...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  const columns = [
    { key: "customerName", label: "No Resi" },
    { key: "destination", label: "Tujuan" },
  ];

  return (
    <TableComponent
      data={deliveries.slice(0, 5)}
      columns={columns}
      showActions={false}
    />
  );
};

export default WaitingDeliveryTable;
