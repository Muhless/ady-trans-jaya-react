// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import Title from "../components/Title.tsx";
import useNavigationHooks from "../hooks/useNavigation.ts";
import SummaryCard from "../components/card/SummaryCard.tsx";
import GraphCard from "../components/card/GraphCard.tsx";
import WaitingDeliveryCard from "../components/card/WaitingDeliveryCard.tsx";
import PendingDeliveryTable from "../components/table/PendingDeliveryTable.tsx";
import Spinner from "../components/Spinner";
import { useAuthStore } from "../stores/AuthStore.js";
import { Car, Package, Truck } from "lucide-react";
import Card from "../components/card/index.tsx";
import SubTitle from "../components/SubTitle.tsx";
import Alerts from "../components/card/Alerts.tsx";
import LiveMap from "../components/card/LiveMap.tsx";
import RecentShipmentsTable from "../components/card/RecentShipments.tsx";
import ShipmentTrendsChart from "../components/card/Shipments.tsx";
import StatCards from "../components/card/StatCard.tsx";
import TableComponent from "../components/table/index.tsx";
import OnGoingDeliveryTable from "../components/table/OnGoingDeliveryTable.tsx";

const DashboardPages = () => {
  const {
    goToVehiclePages,
    goToDriverPages,
    goToCustomerPages,
    goToDeliveryPages,
  } = useNavigationHooks();
  const [isLoading, setIsLoading] = useState(true);

  // const role = useAuthStore((state) => state.role);
  // const user = useAuthStore((state) => state.user);

  const user = useAuthStore((state) => state.user);
  const role = user?.role || "Pengguna";

  if (!role) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  }

  const capitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className="flex flex-col gap-5">
      <div
        className="w-full rounded-xl p-6 bg-cover bg-no-repeat relative h-32 flex items-center"
        style={{
          backgroundImage: "url('/assets/images/bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-xl" />
        <div className="relative z-10 text-white">
          <h1 className="text-2xl font-bold">
            Selamat Datang, {capitalize(role)}
          </h1>
          <p className="text-white/80">Dashboard Ady Trans Jaya</p>
        </div>
      </div>
      <StatCards />
      <div>
        <SubTitle subTitle="Pengiriman Sedang Berlangsung" />
        <OnGoingDeliveryTable />
      </div>
      <div>
        <SubTitle subTitle="Pengiriman Menunggu Persetujuan" />
        <WaitingDeliveryCard />
      </div>
      <SubTitle subTitle="Transaksi" />
      <Card className="h-52"/>
    </div>
  );
};

export default DashboardPages;
