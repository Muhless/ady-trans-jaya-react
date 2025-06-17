import React, { useEffect, useState, useMemo } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  ClockFading,
} from "lucide-react";
import { fetchDeliveries } from "../../../api/delivery";

interface Delivery {
  id: number;
  delivery_status: string;
  createdAt?: string;
  created_at?: string;
  date?: string;
  timestamp?: string;
  delivery_date?: string;
}

interface DeliveryStatCardProps {
  deliveries?: Delivery[];
  loading?: boolean;
  error?: boolean;
}

const DeliveryStatCard: React.FC<DeliveryStatCardProps> = ({
  deliveries: externalDeliveries,
  loading: externalLoading,
  error: externalError,
}) => {
  const [internalStats, setInternalStats] = useState({
    total: 0,
    delivering: 0,
    completed: 0,
    pending: 0,
    failed: 0,
  });
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalError, setInternalError] = useState(false);

  const externalStats = useMemo(() => {
    if (!externalDeliveries) return null;

    const total = externalDeliveries.length;
    const delivering = externalDeliveries.filter(
      (d) => d.delivery_status === "dalam pengiriman"
    ).length;
    const completed = externalDeliveries.filter(
      (d) => d.delivery_status === "selesai"
    ).length;
    const pending = externalDeliveries.filter(
      (d) => d.delivery_status === "menunggu persetujuan"
    ).length;
    const failed = externalDeliveries.filter(
      (d) => d.delivery_status === "gagal"
    ).length;

    return {
      total,
      delivering,
      completed,
      pending,
      failed,
    };
  }, [externalDeliveries]);

  useEffect(() => {
    if (externalDeliveries) return;

    const loadData = async () => {
      setInternalLoading(true);
      setInternalError(false);

      try {
        const deliveries = await fetchDeliveries();

        const total = deliveries.length;
        const delivering = deliveries.filter(
          (d: any) => d.delivery_status === "dalam pengiriman"
        ).length;
        const completed = deliveries.filter(
          (d: any) => d.delivery_status === "selesai"
        ).length;
        const pending = deliveries.filter(
          (d: any) => d.delivery_status === "menunggu persetujuan"
        ).length;
        const failed = deliveries.filter(
          (d: any) => d.delivery_status === "gagal"
        ).length;

        setInternalStats({
          total,
          delivering,
          completed,
          pending,
          failed,
        });
      } catch (error) {
        console.error("Gagal memuat data pengiriman:", error);
        setInternalError(true);
      } finally {
        setInternalLoading(false);
      }
    };

    loadData();
  }, [externalDeliveries]);

  const stats = externalStats || internalStats;
  const isLoading =
    externalLoading !== undefined ? externalLoading : internalLoading;
  const isError = externalError !== undefined ? externalError : internalError;

  const cards = [
    {
      label: "Total Pengiriman",
      value: stats.total,
      icon: <Package className="w-6 h-6 text-blue-500" />,
    },
    {
      label: "Menunggu Persetujuan",
      value: stats.pending,
      icon: <ClockFading className="w-6 h-6 text-purple-500" />,
    },
    {
      label: "Dalam Pengiriman",
      value: stats.delivering,
      icon: <Truck className="w-6 h-6 text-yellow-500" />,
    },
    {
      label: "Selesai",
      value: stats.completed,
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    },

    {
      label: "Gagal",
      value: stats.failed,
      icon: <XCircle className="w-6 h-6 text-red-500" />,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white shadow rounded p-4 text-center space-y-2 animate-pulse"
          >
            <div className="flex justify-center">
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white shadow rounded p-4 text-center space-y-2 border-red-200"
          >
            <div className="flex justify-center">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
            <p className="text-sm text-red-600">Error</p>
            <p className="text-xl font-semibold text-red-500">-</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {cards.map((item, idx) => (
        <div
          key={idx}
          className="bg-white shadow rounded p-4 text-center space-y-2 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-center">{item.icon}</div>
          <p className="text-sm text-gray-600">{item.label}</p>
          <p className="text-xl font-semibold">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DeliveryStatCard;
