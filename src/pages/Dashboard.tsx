import React from "react";
import Table from "../components/molecule/Table.tsx";
import Title from "../components/atom/Title.tsx";
import Card from "../components/molecule/Card.tsx";

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
          <Card title="Pengiriman" classname="bg-secondary text-text">
            <Table data={delivery} />
          </Card>
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
