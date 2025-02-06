import React from "react";
import { Helmet } from "react-helmet-async";

function DeliveryPages() {
  return (
    <>
      <Helmet>
        <title>Pengiriman</title>
        <meta name="description" content="Ini adalah halaman utama" />
      </Helmet>
      <div className="container mx-auto text-white mt-14">
        <div className="flex flex-row gap-3">
          <div className="grid grid-cols-3 h-24 basis-2/3">
            <div className="bg-third flex flex-row items-center">
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
            <div className="bg-third">
              <span>Sedang Berlangsung</span>
            </div>
            <div className="bg-third">
              <span>Selesai</span>
            </div>
          </div>
          <div className="basis-1/3 bg-green-300">
            <span>Cihuy</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeliveryPages;
