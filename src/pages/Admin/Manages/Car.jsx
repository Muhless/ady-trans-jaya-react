import React from "react";
import { Helmet } from "react-helmet-async";
import CarCard from "../../../components/CarCard";

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
        <div className="grid grid-cols-3 bg-fifth rounded-lg row-span-2 p-10 bg-primary">
          {/*  */}
          <div className="col-span-1 items-center text-center h-auto">
            <h1 className="text-5xl font-bold text-white">#Honda Brio</h1>
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
        <div className="flex flex-row gap-3 overflow-x-auto w-full">
          <div className="flex flex-nowrap gap-3">
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default CarPages;
