import React from "react";
import { Helmet } from "react-helmet-async";

function CarPages() {
  return (
    <>
      <Helmet>
        <title>Halaman Daftar Mobil</title>
        <meta
          name="description"
          content="Ini adalah halaman kelola data mobil"
        />
      </Helmet>
      <div className="container mx-auto grid grid-rows-3 h-full">
        <div className="grid grid-cols-3 bg-fifth rounded-lg row-span-2 p-10">
          {/*  */}
          <div className="col-span-1 items-center text-center h-auto">
            <h1 className="text-5xl font-bold">#Honda Brio</h1>
            <div className="flex flex-col w-1/2 bg-white mt-4 text-center rounded-lg mx-auto">
              <h1>Spesifikasi</h1>
              <p>Plat Nomor</p>
            </div>
          </div>
          {/*  */}
          <div className="col-span-2 flex justify-center items-center">
            <img
              src="/assets/images/cars/brio.png"
              alt=""
              className="w-full h-auto object-contain max-h-96"
            />
          </div>
        </div>
        <div className="bg-fifth rounded-lg p-5 flex flex-col justify-center size-52 mt-5 cursor-pointer hover:bg-third hover:ease-in-out">
          <h1 className="font-bold capitalize tracking-wider">Honda Brio</h1>
          <div className="flex flex-grow items-center justify-center w-full">
            <img
              src="\assets\images\cars\brio.png"
              alt="car images"
              className="h-32 w-auto object-contain"
            />
          </div>
          <p className="text-end">Tersedia</p>
        </div>
      </div>
    </>
  );
}

export default CarPages;
