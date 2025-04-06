import React from "react";
import Table from "../components/table/Table.tsx";
import Title from "../components/Title.tsx";
import Card from "../components/card/index.tsx";
import { DashboardCard } from "../components/card/DashboardCard.tsx";

const delivery = [
  { id: 1, nama: "ady", noTelepon: "08871165551", status: "delivery" },
  { id: 2, nama: "ady", noTelepon: "08871165551", status: "on delivery" },
  { id: 3, nama: "ady", noTelepon: "08871165551", status: "cancel" },
  { id: 4, nama: "ady", noTelepon: "08871165551", status: "delivery" },
  { id: 5, nama: "ady", noTelepon: "08871165551", status: "delivery" },
  { id: 1, nama: "ady", noTelepon: "08871165551", status: "delivery" },
  { id: 2, nama: "ady", noTelepon: "08871165551", status: "on delivery" },
  { id: 3, nama: "ady", noTelepon: "08871165551", status: "cancel" },
  { id: 4, nama: "ady", noTelepon: "08871165551", status: "delivery" },
  { id: 5, nama: "ady", noTelepon: "08871165551", status: "delivery" },
  { id: 1, nama: "ady", noTelepon: "08871165551", status: "delivery" },
];

const HomePages = () => {
  return (
    <div>
      <Title title={"Selamat Datang, Admin"} />
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <div className="flex gap-3 mb-3">
            <DashboardCard title="Pengiriman" className="bg-kuning" />
            <DashboardCard title="Driver" className="bg-biru" />
            <DashboardCard title="Customer" className="bg-merah" />
          </div>
          <div className="mb-3">
            <Card
              title="Grafik"
              className="text-text bg-secondary h-[calc(50vh-50px)]"
            >
              <p>Isi Grafik</p>
            </Card>
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            <div className="h-32">
              <a
                href="https://ady-transjaya.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="items-center flex justify-center "
              >
                <img
                  src="assets/images/web3.png"
                  alt="web landing page"
                  className="rounded-md w-full h-32"
                />
              </a>
            </div>
            <Card title="Database" className="bg-merah"></Card>
          </div>
        </div>
        <div className="col-span-1">
          <Card
            title="Pengiriman Menunggu Persetujuan"
            className="bg-secondary text-text max-h-screen"
          >
            <Table data={delivery} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePages;
