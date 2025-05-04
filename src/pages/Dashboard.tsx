import React from "react";
import Title from "../components/Title.tsx";
import useNavigationHooks from "../hooks/useNavigation.ts";
import SummaryCard from "../components/card/SummaryCard.tsx";
import GraphCard from "../components/card/GraphCard.tsx";
import WaitingDeliveryCard from "../components/card/WaitingDeliveryCard.tsx";
import PendingDeliveryTable from "../components/table/PendingDeliveryTable.tsx";

const HomePages = () => {
  const {
    goToCarPages,
    goToDriverPages,
    goToCustomerPages,
    goToDeliveryPages,
  } = useNavigationHooks();
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
          <Title title="Selamat Datang, Admin" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5 mb-5">
        <SummaryCard
          title="Kendaraan"
          value={13}
          textClassName="text-[#3884f2]"
          desc="Kendaraan Tersedia"
          onClick={goToCarPages}
        />
        <SummaryCard
          title="Pengemudi"
          value={8}
          textClassName="text-[#ee453e]"
          desc="Pengemudi Tersedia"
          onClick={goToDriverPages}
        />
        <SummaryCard
          title="Pelanggan"
          value={10}
          textClassName="text-[#e9a60b]"
          desc="Pelanggan Setia"
          onClick={goToCustomerPages}
        />
        <SummaryCard
          title="Pengiriman"
          textClassName="text-[#2ebf62]"
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
