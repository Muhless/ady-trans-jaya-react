import React from "react";
import Table from "../components/table/Table.tsx";
import Title from "../components/Title.tsx";
import Card from "../components/card/index.tsx";
import { ArrowRightSquare, Car, Truck, User, Users } from "lucide-react";
import useNavigationHooks from "../hooks/useNavigation.ts";
import DeliveryCard from "../components/card/DeliveryCard.tsx";
import ChartComponent from "../components/Chart.tsx";
import SummaryCard from "../components/card/SummaryCard.tsx";
import GraphCard from "../components/card/GraphCard.tsx";
import DeliveryDetailCard from "../components/card/DeliveryDetailCard.tsx";

const delivery = [
  { id: 1, nama: "ady", noTelepon: "08871165551", status: "delivery" },
  { id: 2, nama: "ady", noTelepon: "08871165551", status: "on delivery" },
  { id: 3, nama: "ady", noTelepon: "08871165551", status: "cancel" },
  { id: 4, nama: "ady", noTelepon: "08871165551", status: "delivery" },
];

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
        className="w-full rounded-xl p-6 mb-5 bg-cover bg-no-repeat relative h-32"
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
      <Card className="grid grid-cols-2 gap-5 mb-5">
        <GraphCard />
      </Card>
      <Card className="p-10">
        <Table data={delivery} showActions={true} />
      </Card>
    </div>
  );
};

export default HomePages;
