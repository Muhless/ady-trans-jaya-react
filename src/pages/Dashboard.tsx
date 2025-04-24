import React from "react";
import Title from "../components/Title.tsx";
import Card from "../components/card/index.tsx";
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
        className="w-full rounded-xl p-6 mb-5 bg-cover bg-no-repeat relative h-28"
        style={{
          backgroundImage: "url('assets/images/pexels-jplenio-1103970.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-xl" />
        <div className="relative z-10 text-white">
          <Title title={"Selamat Datang, Admin"} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-5">
        <SummaryCard
          title="Kendaraan"
          value={13}
          textClassName="text-[#3884f2]"
          desc="Kendaraan Tersedia"
          subDesc="Tidak Tersedia :"
          valueSubDesc="5"
          onClick={goToCarPages}
        />
        <SummaryCard
          title="Pengemudi"
          value={8}
          textClassName="text-[#ee453e]"
          desc="Pengemudi Tersedia"
          subDesc="Tidak Tersedia :"
          valueSubDesc="5"
          onClick={goToDriverPages}
        />
        <SummaryCard
          title="Pelanggan"
          value={10}
          textClassName="text-[#e9a60b]"
          desc="Pelanggan Setia"
          subDesc="Tidak Tersedia :"
          valueSubDesc="5"
          onClick={goToCustomerPages}
        />
        <SummaryCard
          title="Pengiriman"
          textClassName="text-[#2ebf62]"
          value={5}
          desc="Pengiriman Berlangsung"
          subDesc="Menunggu Persetujuan :"
          valueSubDesc="5"
          onClick={goToDeliveryPages}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <GraphCard />
        <WaitingDeliveryCard />
      </div>
      <PendingDeliveryTable />
    </div>
  );
};

export default HomePages;
