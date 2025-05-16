import React, { useEffect, useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  ClockFading,
} from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import { fetchDeliveries } from "../../api/delivery";

const StatCards = () => {
  const [counts, setCounts] = useState({
    total: 0,
    delivering: 0,
    completed: 0,
    pending: 0,
    failed: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const deliveries = await fetchDeliveries();

        const newCounts = {
          total: deliveries.length,
          delivering: deliveries.filter((d) => d.delivery_status === "dalam pengiriman")
            .length,
          completed: deliveries.filter((d) => d.delivery_status === "selesai").length,
          pending: deliveries.filter((d) => d.delivery_status === "menunggu persetujuan")
            .length,
          failed: deliveries.filter((d) => d.delivery_status === "gagal").length,
        };

        setCounts(newCounts);
      } catch (error) {
        console.error("Gagal memuat data pengiriman:", error);
      }
    };

    loadData();
  }, []);

  const stats = [
    {
      label: "Total Pengiriman",
      value: counts.total,
      icon: <Package className="w-6 h-6 text-blue-500" />,
    },
    {
      label: "Dalam Pengiriman",
      value: counts.delivering,
      icon: <Truck className="w-6 h-6 text-yellow-500" />,
    },
    {
      label: "Selesai",
      value: counts.completed,
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    },
    {
      label: "Pending",
      value: counts.pending,
      icon: <ClockFading className="w-6 h-6 text-purple-500" />,
    },
    {
      label: "Gagal",
      value: counts.failed,
      icon: <XCircle className="w-6 h-6 text-red-500" />,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow rounded p-4 text-center space-y-2"
          >
            <div className="flex justify-center">{item.icon}</div>
            <p className="text-sm text-gray-600">{item.label}</p>
            <p className="text-xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatCards;
