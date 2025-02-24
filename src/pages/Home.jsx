import React from "react";
import { Helmet } from "react-helmet-async";
import DashboardCard from "../components/dashboard/DashboardCard";
import DashboardTable from "../components/dashboard/DashboardTable";
import DashboardGrafik from "../components/dashboard/DashboardGrafik";

const HomePages = () => {
  return (
    <>
      <Helmet>
        <title>Halaman Awal</title>
        <meta name="description" content="Ini adalah halaman utama" />
      </Helmet>
      <h1 className="text-4xl font-bold text-text py-5">
        Selamat Datang, Admin
      </h1>
      <div className="grid grid-cols-3 gap-3 max-h-full">
        <div className="col-span-2 flex flex-col h-full">
          <DashboardGrafik />
          <DashboardTable />
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
