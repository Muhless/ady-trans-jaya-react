import React from "react";
import Table from "../components/table/Table.tsx";
import Title from "../components/Title.tsx";
import Card from "../components/card/index.tsx";
import { ArrowRightSquare } from "lucide-react";
import useNavigationHooks from "../hooks/useNavigation.ts";
import DeliveryCard from "../components/card/DeliveryCard.tsx";
import { Bar } from "react-chartjs-2";

const delivery = [
  { id: 1, nama: "ady", noTelepon: "08871165551", status: "delivery" },
  { id: 2, nama: "ady", noTelepon: "08871165551", status: "on delivery" },
  { id: 3, nama: "ady", noTelepon: "08871165551", status: "cancel" },
  { id: 4, nama: "ady", noTelepon: "08871165551", status: "delivery" },
];

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      label: "Pengiriman",
      data: [120, 150, 180, 130],
      backgroundColor: "#1E88E5",
    },
  ],
};

const HomePages = () => {
  const { goToCarPages, goToDriverPages, goToCustomerPages } =
    useNavigationHooks();
  return (
    <div>
      <Title title={"Selamat Datang, Admin"} />

      <div className="grid grid-cols-3 gap-5 mb-5">
        <div className="col-span-2">
          <Card title="Transaksi" className="h-80">
            <Bar data={data} />
          </Card>
        </div>
        <Card
          title="Pengiriman Menunggu Persetujuan"
          className="bg-secondary text-text h-80"
        >
          <Table data={delivery} />
        </Card>
      </div>
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-2 space-y-5">
          <Card
            className="bg-third h-20 flex items-center justify-between px-10 cursor-pointer hover:bg-slate-400 hover:text-background"
            onClick={goToCarPages}
          >
            <h2 className="text-6xl font-bold">7</h2>
            <h3 className="text-xl">Kendaraan</h3>
            <ArrowRightSquare size={35} />
          </Card>
          <Card
            className="bg-third h-20 flex items-center justify-between px-10 cursor-pointer hover:bg-slate-400 hover:text-background"
            onClick={goToDriverPages}
          >
            <h2 className="text-6xl font-bold">7</h2>
            <h3 className="text-xl">Driver</h3>
            <ArrowRightSquare size={35} />
          </Card>
          <Card
            className="bg-third h-20 flex items-center justify-between px-10 cursor-pointer hover:bg-slate-400 hover:text-background"
            onClick={goToCustomerPages}
          >
            <h2 className="text-6xl font-bold">7</h2>
            <h3 className="text-xl">Customer</h3>
            <ArrowRightSquare size={35} />
          </Card>
        </div>

        <div className="col-span-3">
          <DeliveryCard />
        </div>
      </div>
    </div>
  );
};

export default HomePages;
