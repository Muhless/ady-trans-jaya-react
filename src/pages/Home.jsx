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
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 border-black">
          <div className="p-5 bg-card rounded-xl">
            <span className="text-3xl font-bold text-background font-jakarta">
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
              background={"bg-white"}
              description={"5"}
              textColor={"text-text"}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <DashboardTable />
            <DashboardTable />
          </div>
          <DashboardGrafik />
        </div>
        <div className="col-span-1 p-5 bg-white border border-black rounded-xl">
          <h1 className="text-2xl">Pengiriman</h1>
        </div>
      </div>
    </>
  );
};

export default HomePages;
