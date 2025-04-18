import React from "react";
import Table from "../components/table/Table.tsx";
import Title from "../components/Title.tsx";
import Card from "../components/card/index.tsx";
import { ArrowRightSquare, Car, Truck, User, Users } from "lucide-react";
import useNavigationHooks from "../hooks/useNavigation.ts";
import DeliveryCard from "../components/card/DeliveryCard.tsx";
import ChartComponent from "../components/Chart.tsx";
import SummaryCard from "../components/card/SummaryCard.tsx";

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
      <Title title={"Selamat Datang, Admin"} />
      <div className="grid grid-cols-4 gap-3 mb-3">
        <SummaryCard
          title="Kendaraan"
          value={13}
          icon={<Car size={40} />}
          onClick={goToCarPages}
        />
        <SummaryCard
          title="Pengemudi"
          value={8}
          icon={<User size={40} />}
          onClick={goToDriverPages}
        />
        <SummaryCard
          title="Pelanggan"
          value={10}
          icon={<Users size={40} />}
          onClick={goToCustomerPages}
        />
        <SummaryCard
          title="Pengiriman"
          value={5}
          icon={<Truck size={40} />}
          onClick={goToDeliveryPages}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Card className="rounded-xl bg-secondary mb-3 h-40"></Card>
        <Card className="rounded-xl bg-secondary mb-3 h-40"></Card>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <Card
            title="Grafik Pengiriman"
            className="h-80 rounded-xl bg-secondary p-3"
          >
            <div className="h-60">
              <ChartComponent />
            </div>
          </Card>
        </div>
        <Card
          title="Pengiriman Menunggu Persetujuan"
          className="bg-secondary text-text h-80 p-3 rounded-xl"
        >
          <Table data={delivery} />
        </Card>
      </div>
    </div>
  );
};

export default HomePages;
