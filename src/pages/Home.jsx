import React from "react";
import { Helmet } from "react-helmet-async";
import DashboardCard from "../components/dashboard/DashboardCard";
import DashboardGrafik from "../components/dashboard/DashboardGrafik";
import Table from "../components/Table";
import Title from "../components/Title";

const HomePages = () => {
  return (
    <>
      <Title title={"Selamat Datang, Admin"} />
      <div className="grid grid-cols-3 gap-3 max-h-full">
        <div className="col-span-2 flex flex-col h-full">
          <DashboardGrafik />
          <Table />
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
