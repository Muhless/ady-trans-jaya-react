import React, { useEffect, useState } from "react";
import Title from "../components/Title.tsx";
import useNavigationHooks from "../hooks/useNavigation.ts";
import SummaryCard from "../components/card/SummaryCard.tsx";
import GraphCard from "../components/card/GraphCard.tsx";
import WaitingDeliveryCard from "../components/card/WaitingDeliveryCard.tsx";
import PendingDeliveryTable from "../components/table/PendingDeliveryTable.tsx";
import { useAuth } from "../../utils/AuthContext.tsx";
import { useAuthStore } from "../stores/AuthStore.ts";

const HomePages: React.FC<{ title?: string }> = ({ title }) => {
  const { userRole } = useAuth();
  const { role } = useAuthStore();
  const [pageTitle, setPageTitle] = useState<string>(""); // State untuk menyimpan title

  const {
    goToVehiclePages,
    goToDriverPages,
    goToCustomerPages,
    goToDeliveryPages,
  } = useNavigationHooks();

  const getWelcomeMessage = () => {
    const currentRole = role || userRole;

    if (currentRole === "admin") {
      return "Selamat Datang, Admin";
    } else if (currentRole === "owner") {
      return "Selamat Datang, Owner";
    } else if (currentRole === "driver") {
      return "Selamat Datang, Driver";
    } else if (currentRole === "manager") {
      return "Selamat Datang, Manager";
    } else {
      return "Selamat Datang";
    }
  };

  return (
    <div>
      {/* Set document title */}
      {pageTitle && <title>{pageTitle}</title>}

      <div
        className="w-full rounded-xl p-6 mb-5 bg-cover bg-no-repeat relative h-28 flex items-center"
        style={{
          backgroundImage: "url('assets/images/bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-md" />
        <div className="relative z-10 text-white">
          <Title title={getWelcomeMessage()} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5 mb-5">
        <SummaryCard
          title="Total Pengiriman"
          value={13}
          desc="Kendaraan Tersedia"
          onClick={goToVehiclePages}
        />
        <SummaryCard
          title="Pengemudi"
          value={8}
          desc="Pengemudi Tersedia"
          onClick={goToDriverPages}
        />
        <SummaryCard
          title="Pelanggan"
          value={10}
          desc="Pelanggan Setia"
          onClick={goToCustomerPages}
        />
        <SummaryCard
          title="Pengiriman"
          value={5}
          desc="Pengiriman Berlangsung"
          onClick={goToDeliveryPages}
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <GraphCard />
        <WaitingDeliveryCard />
      </div>
      <PendingDeliveryTable />
    </div>
  );
};

export default HomePages;
