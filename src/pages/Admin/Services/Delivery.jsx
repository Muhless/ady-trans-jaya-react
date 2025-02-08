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
              <div className="bg-white text-black mt-5 rounded-lg">
                <table className="w-full ">
                  <thead>
                    <tr>
                      <th className="border px-5">No</th>
                      <th className="border px-5">Nama</th>
                      <th className="border px-5">Plat Nomor</th>
                      <th className="border px-5">Harga</th>
                      <th className="border px-5">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-5">cihuy</td>
                      <td className="border px-5">cihuy</td>
                      <td className="border px-5">cihuy</td>
                      <td className="border px-5">cihuy</td>
                      <td className="border px-5">cihuy</td>
                    </tr>
                  </tbody>
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
