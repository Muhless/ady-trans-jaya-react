import React from "react";
import DashboardCard from "../components/dashboard/DashboardCard";
import DashboardGrafik from "../components/dashboard/DashboardGrafik";
import Table from "../components/Molecule/Table.tsx";
import Title from "../components/Atom/Title";

const delivery = [
  { no: 1, name: "ady", phone: "08871165551", status: "delivery" },
  { no: 2, name: "ady", phone: "08871165551", status: "delivery" },
  { no: 3, name: "ady", phone: "08871165551", status: "delivery" },
  { no: 1, name: "ady", phone: "08871165551", status: "delivery" },
  { no: 2, name: "ady", phone: "08871165551", status: "delivery" },
  { no: 3, name: "ady", phone: "08871165551", status: "delivery" },
  { no: 1, name: "ady", phone: "08871165551", status: "delivery" },
];

const HomePages = () => {
  return (
    <>
      <Title title={"Selamat Datang, Admin"} />
      <div className="grid grid-cols-3 gap-3 max-h-full">
        <div className="col-span-2 flex flex-col h-full">
          <DashboardGrafik />
          <Table data={delivery} />
        </div>
        <div className="col-span-1">
          <DashboardCard
            title="Pengiriman"
            background="bg-merah"
            description={"cihuy"}
          />
          <DashboardCard
            title={"Transaksi"}
            background={"bg-kuning"}
            description={"cihuy lagi aja"}
          />
          <DashboardCard
            title={"Pendapatan"}
            background={"bg-biru"}
            description={"5"}
          />
        </div>
      </div>
    </>
  );
};

export default HomePages;
