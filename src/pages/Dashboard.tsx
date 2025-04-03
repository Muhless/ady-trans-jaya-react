import React from "react";
import Table from "../components/molecule/Table.tsx";
import Title from "../components/atom/Title.tsx";
import Card from "../components/molecule/Card.tsx";

const delivery = [
  { id: 1, nama: "ady", noTelepon: "08871165551", status: "delivery" },
  { id: 2, nama: "ady", noTelepon: "08871165551", status: "on delivery" },
  { id: 3, nama: "ady", noTelepon: "08871165551", status: "cancel" },
  { id: 4, nama: "ady", noTelepon: "08871165551", status: "delivery" },
  { id: 5, nama: "ady", noTelepon: "08871165551", status: "delivery" },
  { id: 6, nama: "ady", noTelepon: "08871165551", status: "delivery" },
  { id: 7, nama: "ady", noTelepon: "08871165551", status: "delivery" },
  { id: 8, nama: "ady", noTelepon: "08871165551", status: "on delivery" },
  { id: 9, nama: "ady", noTelepon: "08871165551", status: "cancel" },
  { id: 10, nama: "ady", noTelepon: "08871165551", status: "delivery" },
  { id: 11, nama: "ady", noTelepon: "08871165551", status: "delivery" },
  { id: 12, nama: "ady", noTelepon: "08871165551", status: "delivery" },
];

const HomePages = () => {
  return (
    <>
      <Title title={"Selamat Datang, Admin"} />
      <div className="grid grid-cols-3 mb-3 gap-3">
        <div className="col-span-2 space-y-3">
          <div className="gap-3 h-32 grid grid-cols-3">
            <Card className="bg-merah flex items-center justify-center">
              <img src="/assets/images/home.png" alt="icon image" className="size-20" />
              <h2 className="text-2xl">Pengiriman</h2>
            </Card>
            <Card className="bg-biru flex items-center justify-center">
              <img src="/assets/images/home.png" alt="icon image" className="size-20" />
              <h2 className="text-2xl">Pengiriman</h2>
            </Card>
            <Card className="bg-kuning flex items-center justify-center">
              <img src="/assets/images/home.png" alt="icon image" className="size-20" />
              <h2 className="text-2xl">Pengiriman</h2>
            </Card>
          </div>
          <Card title="Grafik" className="text-text bg-secondary h-72">
            <p>Isi Grafik</p>
          </Card>
          <div className="grid grid-cols-2 gap-x-3 h-40">
            <Card title="Landing Page" className="bg-kuning"></Card>
            <Card title="Database" className="bg-merah"></Card>
          </div>
        </div>
        <div className="col-span-1">
          <Card
            title="Pengiriman Menunggu Persetujuan"
            className="bg-secondary text-text"
          >
            <Table data={delivery} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default HomePages;
