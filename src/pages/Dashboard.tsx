import React from "react";
import Table from "../components/table/Table.tsx";
import Title from "../components/Title.tsx";
import Card from "../components/card/index.tsx";
import { Car, Truck } from "lucide-react";

const delivery = [
  { id: 1, nama: "ady", noTelepon: "08871165551", status: "delivery" },
  { id: 2, nama: "ady", noTelepon: "08871165551", status: "on delivery" },
  { id: 3, nama: "ady", noTelepon: "08871165551", status: "cancel" },
  { id: 4, nama: "ady", noTelepon: "08871165551", status: "delivery" },
  { id: 5, nama: "ady", noTelepon: "08871165551", status: "delivery" },
  { id: 1, nama: "ady", noTelepon: "08871165551", status: "delivery" },
  { id: 2, nama: "ady", noTelepon: "08871165551", status: "on delivery" },
];

const HomePages = () => {
  return (
    <div>
      <Title title={"Selamat Datang, Admin"} />

      <div className="grid grid-cols-4 h-28 gap-3 mb-3">
        <Card>
          <div className="space-y-2">
            <div className="flex justify-center bg-blue-100 p-2 rounded-full size-10">
              <Car size={24} className="" />
            </div>
            <h1 className="text-lg font-bold">Kendaraan</h1>
          </div>
        </Card>
        <Card title="Driver" />
        <Card title="Customer" />
        <Card title="Customer" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <Card title="Transaksi" className="h-[calc(50vh-50px)]"></Card>
        </div>
        <Card
          title="Pengiriman Menunggu Persetujuan"
          className="bg-secondary text-text max-h-screen"
        >
          <Table data={delivery} />
        </Card>
      </div>
    </div>
  );
};

export default HomePages;
