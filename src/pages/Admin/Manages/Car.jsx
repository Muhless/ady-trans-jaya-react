import React from "react";
import { Helmet } from "react-helmet-async";

function CarPages() {
  return (
    <>
      <Helmet>
        <title>Kelola Mobil</title>
        <meta
          name="description"
          content="Ini adalah halaman kelola data mobil"
        />
      </Helmet>
      <div className="container mx-auto bg-fifth rounded-lg">
        {/*  */}
        <div className="grid grid-cols-3 h-96">
          <div className="col-span-1 items-center text-center">
            <h1 className="text-5xl font-bold">Toyota Avanza</h1>
            <div className="flex flex-col w-1/2 bg-white mt-4 text-center rounded-lg mx-auto">
              <h1>Spesifikasi</h1>
              <p>Plat Nomor</p>
            </div>
          </div>
          <div className="col-span-2 items-center">
            <img src="/assets/images/cars/box.png" alt="" className="h-2/3" />
          </div>
        </div>
        {/*  */}
      </div>
    </>
  );
}

export default CarPages;
