import React, { useEffect, useState } from "react";
import {
  User as UserIcon,
  Users,
  CarFront,
  Truck,
  Handshake,
  Filter,
} from "lucide-react";
import { fetchCustomers } from "../../../api/customer";
import { fetchDeliveries } from "../../../api/delivery";
import { fetchDrivers } from "../../../api/driver";
import { fetchTransactions } from "../../../api/transaction";
import { fetchVehicles } from "../../../api/vehicle";

const DashboardStats = () => {
  const [counts, setCounts] = useState({
    drivers: 0,
    customers: 0,
    vehicles: 0,
    deliveries: 0,
    transactions: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const drivers = await fetchDrivers();
        const customers = await fetchCustomers();
        const vehicles = await fetchVehicles();
        const deliveries = await fetchDeliveries();
        const transactions = await fetchTransactions();

        const availableDrivers = drivers.filter((d) => d.status === "tersedia");
        const availableVehicles = vehicles.filter(
          (v) => v.status === "tersedia"
        );

        const activeDeliveries = deliveries.filter(
          (d) =>
            d.delivery_status === "dalam pengiriman" ||
            d.delivery_status === "menunggu pengemudi"
        );

        const activeTransactions = transactions.filter(
          (t) => t.transaction_status === "berjalan"
        );

        setCounts({
          drivers: availableDrivers.length,
          customers: customers.length,
          vehicles: availableVehicles.length,
          deliveries: activeDeliveries.length,
          transactions: activeTransactions.length,
        });
      } catch (error) {
        console.error("Gagal memuat data:", error);
      }
    };

    loadData();
  }, []);

  const stats = [
    {
      label: "Pengemudi",
      value: counts.drivers,
      icon: <UserIcon className="w-6 h-6 text-blue-500" />,
    },
    {
      label: "Pelanggan",
      value: counts.customers,
      icon: <Users className="w-6 h-6 text-yellow-500" />,
    },
    {
      label: "Kendaraan",
      value: counts.vehicles,
      icon: <CarFront className="w-6 h-6 text-green-500" />,
    },
    {
      label: "Pengiriman",
      value: counts.deliveries,
      icon: <Truck className="w-6 h-6 text-purple-500" />,
    },
    {
      label: "Transaksi",
      value: counts.transactions,
      icon: <Handshake className="w-6 h-6 text-red-500" />,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow rounded p-4 text-center space-y-2"
          >
            <div className="flex justify-center">{item.icon}</div>
            <p className="text-sm text-gray-600">{item.label}</p>
            <p className="text-xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default DashboardStats;
