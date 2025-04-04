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
];

const HomePages = () => {
  return (
    <div className="">
      <Title title={"Selamat Datang, Admin"} />
      {/* top */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        <Card className="bg-merah flex items-center justify-center">
          <img
            src="/assets/images/home.png"
            alt="icon image"
            className="size-16"
          />
          <h2 className="text-2xl">Pengiriman</h2>
        </Card>
        <Card className="bg-biru flex items-center justify-center">
          <img
            src="/assets/images/home.png"
            alt="icon image"
            className="size-16"
          />
          <h2 className="text-2xl">Pengiriman</h2>
        </Card>
        <Card className="bg-kuning flex items-center justify-center">
          <img
            src="/assets/images/home.png"
            alt="icon image"
            className="size-16"
          />
          <h2 className="text-2xl">Pengiriman</h2>
        </Card>
      </div>
      {/* mid */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="col-span-2 space-y-3">
          <Card
            title="Grafik"
            className="text-text bg-secondary h-[calc(50vh-50px)]"
          >
            <p>Isi Grafik</p>
          </Card>
          <div className="grid grid-cols-2 gap-x-3">
            <div className="h-48">
              <a
                href="https://ady-transjaya.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="items-center flex justify-center "
              >
                <img
                  src="assets/images/web3.png"
                  alt="web landing page"
                  className="rounded-md w-full h-48"
                />
              </a>
            </div>
            <Card title="Database" className="bg-merah"></Card>
          </div>
        </div>
        <Card
          title="Pengiriman Menunggu Persetujuan"
          className="bg-secondary text-text max-h-[calc(50vh-50px)]"
        >
          <Table data={delivery} />
        </Card>
      </div>
      {/* bottom */}
    </div>
  );
};

export default HomePages;
