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

const DashboardPages = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    goToVehiclePages,
    goToDriverPages,
    goToCustomerPages,
    goToDeliveryPages,
  } = useNavigationHooks();


  const role = useAuthStore((state) => state.role);

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[60vh]">
  //       <Spinner />
  //     </div>
  //   );
  // }

 
  return (
    <div>
      <div
        className="w-full rounded-xl p-6 mb-5 bg-cover bg-no-repeat relative h-28 flex items-center"
        style={{
          backgroundImage: "url('/assets/images/bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-md" />
        <div className="relative z-10 text-white">
          <Title title={`Selamat Datang, ${role || "Admin"}`} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        <SummaryCard
          title="Total Kendaraan"
          desc="Kendaraan Tersedia"
          onClick={goToVehiclePages}
        />
        <SummaryCard
          title="Pengemudi"
          desc="Pengemudi Tersedia"
          onClick={goToDriverPages}
        />
        <SummaryCard
          title="Pelanggan"
          desc="Pelanggan Setia"
          onClick={goToCustomerPages}
        />
        <SummaryCard
          title="Pengiriman"
          desc="Pengiriman Berlangsung"
          onClick={goToDeliveryPages}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <GraphCard />
        <WaitingDeliveryCard />
      </div>
      <PendingDeliveryTable />
    </div>
  );
};

export default DashboardPages;
