import React from "react";
import banner from "/assets/images/obi-pixel9propics-aZKJEvydrNM-unsplash.jpg";
import { Helmet } from "react-helmet-async";

const HomePages = () => {
  return (
    <>
      <Helmet>
        <title>Halaman Awal</title>
        <meta name="description" content="Ini adalah halaman utama" />
      </Helmet>
      <div className="container mx-auto text-white">
          <div className="gap-7 h-80 grid grid-cols-3">
            <div className="bg-fourth p-6 rounded-3xl flex flex-col">
              <span className="text-2xl font-bold text-black">Selamat Datang, Admin</span>
              <img src="\assets\images\home.png" alt="icon" className="w-72 mx-auto"/>
            </div>
            <div className="bg-secondary p-6 rounded-3xl">
              <span className="text-2xl font-bold">Rental</span>
            </div>
            <div className="bg-secondary p-6 rounded-3xl">
              <span className="text-2xl font-bold">Pengiriman</span>
            </div>
          </div>
          <div className="grid grid-cols-3 rounded-3xl gap-7 mt-7 h-80">
            <div className="bg-secondary p-6 rounded-3xl col-span-2">
              <span className="text-2xl font-bold">Transaksi</span>
            </div>
            <div className="bg-secondary p-6 rounded-3xl">
              <span className="text-2xl font-bold">Keuangan</span>
            </div>
          </div>
      </div>
    </>
  );
};

export default HomePages;
