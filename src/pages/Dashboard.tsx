// src/pages/Dashboard.tsx
import React from "react";
import Spinner from "../components/Spinner";
import { useAuthStore } from "../stores/AuthStore.js";
import DashboardStatCard from "@/components/card/stat/DashboardStatCard";
import TransactionGraphic from "@/components/card/TransactionGraphic";
import TransactionCard from "@/components/card/TransactionCard";
import OnGoingDeliveryCard from "@/components/card/OnGoingDeliveryCard";
import WaitingDeliveryCard from "@/components/card/OnGoingDeliveryCard";

const DashboardPages = () => {
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
        className="w-full rounded-md p-6 bg-cover bg-no-repeat relative h-32 flex items-center"
        style={{
          backgroundImage: "url('/assets/images/bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-xl" />
        <div className="relative z-10 text-white">
          <h1 className="text-2xl font-bold">
            Selamat Datang, {capitalize(role)}
          </h1>
          <p className="text-white/80">Dashboard PT. Ady Trans Jaya</p>
        </div>
      </div>
      <DashboardStatCard />
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-1">
          <TransactionGraphic />
        </div>
        <div className="col-span-2">
          <TransactionCard />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <OnGoingDeliveryCard />
        <WaitingDeliveryCard />
      </div>
    </div>
  );
};

export default DashboardPages;
