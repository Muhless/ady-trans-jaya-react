import React from "react";
import DashboardGrafik from "../components/Atom/Graphics.tsx";
import Table from "../components/Molecule/Table.tsx";
import Title from "../components/Atom/Title";
import Card from "../components/Molecule/Card.tsx";
import SubTitle from "../components/Atom/SubTitle.tsx";

const delivery = [
  { id: 1, name: "ady", phone: "08871165551", status: "delivery" },
  { id: 2, name: "ady", phone: "08871165551", status: "on delivery" },
  { id: 3, name: "ady", phone: "08871165551", status: "cancel" },
  { id: 4, name: "ady", phone: "08871165551", status: "delivery" },
  { id: 5, name: "ady", phone: "08871165551", status: "delivery" },
  { id: 6, name: "ady", phone: "08871165551", status: "delivery" },
];

const HomePages = () => {
  return (
    <>
      <Title title={"Selamat Datang, Admin"} />
      <div className="grid grid-cols-3 gap-3 max-h-full">
        <div className="col-span-2 flex flex-col">
          <Card title="Grafik" classname="text-text bg-secondary"></Card>
          <div className="bg-white p-3 rounded-lg">
            <Card title="Pengiriman" classname="text-primary">
              <Table data={delivery} />
            </Card>
          </div>
        </div>
        <div className="col-span-1">
          <Card title="Pengiriman" classname="bg-merah"></Card>
          <Card title="Pengiriman" classname="bg-biru"></Card>
          <Card title="Pengiriman" classname="bg-kuning"></Card>
        </div>
      </div>
    </>
  );
};

export default HomePages;
