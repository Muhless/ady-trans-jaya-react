import React from "react";
import { Helmet } from "react-helmet-async";

function DeliveryPages() {
  return (
    <>
      <Helmet>
        <title>Pengiriman</title>
        <meta name="description" content="Ini adalah halaman utama" />
      </Helmet>
      <div className="container mx-auto text-white">
        <div className="flex flex-row gap-3">
          <div className="grid grid-cols-3 h-full basis-2/3">
            <div className="bg-third flex flex-row items-center justify-center p-1">
              <img
                src="/assets/images/home.png"
                alt="menunggu persetujuan"
                className="size-20"
              />
              <div className="flex flex-col items-center">
                <span>Menunggu</span>
                <span>Persetujuan</span>
                <span className="text-4xl">4</span>
              </div>
            </div>
            <div className="bg-blue-400 flex flex-row items-center justify-center">
              <img
                src="/assets/images/home.png"
                alt="menunggu persetujuan"
                className="size-20"
              />
              <div className="flex flex-col items-center">
                <span>Sedang</span>
                <span>Berlangsung</span>
                <span className="text-4xl">4</span>
              </div>
            </div>
            <div className="bg-yellow-400 items-center flex flex-row justify-center">
              <img
                src="/assets/images/home.png"
                alt="menunggu persetujuan"
                className="size-20"
              />
              <div className="flex flex-col items-center">
                <span>Selesai</span>
                <span className="text-4xl">4</span>
              </div>
            </div>
            {/* table */}
            <div className="col-span-3 mt-5">
              <h1 className="font-bold text-xl">Menunggu Persetujuan</h1>
              <div className="bg-orange-400">
                <table className="">
                  <thead className="flex flex-row justify-between">
                    <tr>No</tr>
                    <tr>Nama</tr>
                    <tr>Tanggal</tr>
                    <tr>Mobil</tr>
                    <tr>Durasi</tr>
                  </thead>
                </table>
              </div>
            </div>
            {/*  */}
          </div>
          <div className="basis-1/3 bg-green-300 flex flex-col items-center">
            <span>Cihuy</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeliveryPages;
