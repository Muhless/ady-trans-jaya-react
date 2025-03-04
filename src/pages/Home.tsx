import React from "react";
import DashboardGrafik from "../components/Atom/Graphics.tsx";
import Table from "../components/Molecule/Table.tsx";
import Title from "../components/Atom/Title";
import Card from "../components/Molecule/Card.tsx";

const delivery = [
  { id: 1, name: "ady", phone: "08871165551", status: "delivery" },
  { id: 2, name: "ady", phone: "08871165551", status: "delivery" },
  { id: 3, name: "ady", phone: "08871165551", status: "delivery" },
  { id: 1, name: "ady", phone: "08871165551", status: "delivery" },
  { id: 2, name: "ady", phone: "08871165551", status: "delivery" },
  { id: 3, name: "ady", phone: "08871165551", status: "delivery" },
  { id: 1, name: "ady", phone: "08871165551", status: "delivery" },
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
          <Card
            title="Pengiriman"
            classname="bg-merah"
            description={"cihuy"}
          />
          <Card
            title={"Transaksi"}
            classname={"bg-kuning"}
            description={"cihuy lagi aja"}
          />
          <Card
            title={"Pendapatan"}
            classname={"bg-biru"}
            description={"5"}
          />
        </div>
      </div>
    </>
  );
};

export default HomePages;
