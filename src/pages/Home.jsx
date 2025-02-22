import React from "react";
import { Helmet } from "react-helmet-async";
import DashboardCard from "../components/dashboard/DashboardCard";
import DashboardTable from "../components/dashboard/DashboardTable";

const HomePages = () => {
  return (
    <>
      <Helmet>
        <title>Halaman Awal</title>
        <meta name="description" content="Ini adalah halaman utama" />
      </Helmet>
      <div className="grid grid-cols-3 gap-3 ">
        <div className="col-span-2">
          <div className="p-5 bg-card rounded-xl">
            <span className="text-3xl font-bold text-background font-jakarta">
              Selamat Datang, Admin
            </span>
          </div>
          {/* <h1 className="py-5 text-2xl">Dashboard</h1> */}
          <div className="grid grid-cols-3 mb-5 text-white gap-4 mt-5">
            <DashboardCard
              title="Pengiriman"
              background="bg-card"
              description={"cihuy"}
            />
            <DashboardCard
              title={"Transaksi"}
              background={"bg-white"}
              description={"cihuy lagi aja"}
              textColor={"text-card"}
            />
            <DashboardCard
              title={"Pendapatan"}
              background={"bg-white"}
              description={"cihuy lagi aja"}
              textColor={"text-card"}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="border border-black bg-white p-5 rounded-xl">
              <h1 className="text-xl font-bold mb-3">Pengiriman</h1>
              <DashboardTable />
            </div>
          </div>
        </div>
        <div className="border border-card rounded-xl p-5">
          <h1>Judul</h1>
        </div>
      </div>
    </>
  );
};

export default HomePages;
