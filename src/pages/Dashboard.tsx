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
      <Title  title={"Selamat Datang, Admin"} />
      <div className="grid grid-cols-3 mb-3 gap-3">
        <div className="flex col-span-2 gap-3">
          <Card title="Pengiriman" className="bg-merah w-1/3"></Card>
          <Card title="Pengiriman" className="bg-biru w-1/3"></Card>
          <Card title="Pengiriman" className="bg-kuning w-1/3"></Card>
        </div>
        <div>
          <Card title="Pengiriman" className="bg-kuning"></Card>
        </div>
      </div>
      <div className="grid max-h-full grid-cols-3 gap-3">
        <div className="flex flex-col col-span-2">
          <Card title="Grafik" className="text-text bg-secondary"></Card>
          {/* <Card title="Pengiriman" className="bg-secondary text-text">
            <Table data={delivery} />
          </Card> */}
        </div>
      </div>
    </>
  );
};

export default HomePages;
