import React, { useEffect, useState } from "react";
import Title from "../components/Title.tsx";
import useNavigationHooks from "../hooks/useNavigation.ts";
import SummaryCard from "../components/card/SummaryCard.tsx";
import GraphCard from "../components/card/GraphCard.tsx";
import WaitingDeliveryCard from "../components/card/WaitingDeliveryCard.tsx";
import PendingDeliveryTable from "../components/table/PendingDeliveryTable.tsx";
import { useAuthStore } from "../stores/AuthStore.ts";
import axios from "axios";
import { API_BASE_URL } from "../apiConfig.ts";

const DashboardPages = () => {
  const {
    goToVehiclePages,
    goToDriverPages,
    goToCustomerPages,
    goToDeliveryPages,
  } = useNavigationHooks();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .get(`${API_BASE_URL}/users`)
      .then((res) => {
        console.log("Data user dari /login:", res.data);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error("Gagal ambil data user", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      });
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div
        className="w-full rounded-xl p-6 mb-5 bg-cover bg-no-repeat relative h-28 flex items-center"
        style={{
          backgroundImage: "url('assets/images/bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-md" />
        <div className="relative z-10 text-white">
          <Title title="Selamat Datang, ???" />
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

export default DashboardPages;
