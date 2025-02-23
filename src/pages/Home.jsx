import React from "react";
import { Helmet } from "react-helmet-async";
import DashboardCard from "../components/dashboard/DashboardCard";
import DashboardTable from "../components/dashboard/DashboardTable";
import DashboardGrafik from "../components/dashboard/DashboardGrafik";
import DashboardRight from "../components/dashboard/DashboardRight";

const HomePages = () => {
  return (
    <>
      <Helmet>
        <title>Halaman Awal</title>
        <meta name="description" content="Ini adalah halaman utama" />
      </Helmet>
      <div className="grid grid-cols-3 gap-5">
        <div className="max-h-screen col-span-2">
          <div className="p-5 bg-card rounded-xl">
            <span className="text-3xl font-bold text-background">
              Selamat Datang, Admin
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-5 mb-5 text-white">
            <DashboardCard
              title="Pengiriman"
              background="bg-card"
              description={"cihuy"}
            />
            <DashboardCard
              title={"Transaksi"}
              background={"bg-primary"}
              description={"cihuy lagi aja"}
            />
            <DashboardCard
              title={"Pendapatan"}
              background={"bg-biru"}
              description={"5"}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <DashboardTable />
            <DashboardTable />
          </div>
          <DashboardGrafik />
        </div>
        <div className="max-h-full col-span-1">
          <DashboardRight/>
          <DashboardRight/>
        </div>
      </div>
    </>
  );
};

export default HomePages;
