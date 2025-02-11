import React from "react";
import { Helmet } from "react-helmet-async";

function DriverPages() {
  return (
    <>
      <Helmet>
        <title>Halaman Daftar Pengemudi</title>
        <meta
          name="description"
          content="Ini adalah halaman kelola pengemudi"
        />
      </Helmet>
      <div className="grid grid-cols-4 gap-5">
        <div className="bg-fifth flex flex-row w-auto">
          <div className="items-center">
            <img
              src="\assets\images\profile\1.jpg"
              alt=""
              className="size-52 p-3"
            />
          </div>
          <div className="py-5 px-2">
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p>08871165551</p>
            <p>Riwayat Perjalanan</p>
            <p>Keterangan</p>
          </div>
        </div>
        <div className="bg-fifth flex flex-row w-auto">
          <div className="">
            <img
              src="\assets\images\profile\pexels-creationhill-1681010.jpg"
              alt=""
              className="size-64 p-3"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">John Doe</h1>
            <p>Kontak</p>
            <p>Riwayat Perjalanan</p>
            <p>Keterangan</p>
          </div>
        </div>
        <div className="bg-fifth flex flex-row w-auto">
          <div className="">
            <img
              src="\assets\images\profile\pexels-creationhill-1681010.jpg"
              alt=""
              className="size-64 p-3"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">John Doe</h1>
            <p>Kontak</p>
            <p>Riwayat Perjalanan</p>
            <p>Keterangan</p>
          </div>
        </div>
        <div className="bg-fifth flex flex-row w-auto">
          <div className="">
            <img
              src="\assets\images\profile\pexels-creationhill-1681010.jpg"
              alt=""
              className="size-64 p-3"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">John Doe</h1>
            <p>Kontak</p>
            <p>Riwayat Perjalanan</p>
            <p>Keterangan</p>
          </div>
        </div>
        <div className="bg-fifth flex flex-row w-auto">
          <div className="">
            <img
              src="\assets\images\profile\3.jpg"
              alt=""
              className="size-64 p-3"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">John Doe</h1>
            <p>Kontak</p>
            <p>Riwayat Perjalanan</p>
            <p>Keterangan</p>
          </div>
        </div>
        <div className="bg-fifth flex flex-row w-auto">
          <div className="">
            <img
              src="\assets\images\profile\2.jpg"
              alt=""
              className="size-64 p-3"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">John Doe</h1>
            <p>Kontak</p>
            <p>Riwayat Perjalanan</p>
            <p>Keterangan</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DriverPages;
