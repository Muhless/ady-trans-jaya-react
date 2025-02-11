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
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-secondary text-white flex flex-row h-72 rounded-2xl p-5">
            <img
              src="\assets\images\profile\1.jpg"
              alt=""
              className="w-44 max-h-full rounded-2xl mr-5"
            />
          <div className="py-5 px-2 flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold underline mb-4">John Doe</h1>
            <p className="text-2xl">08871165551</p>
            <p>Riwayat Perjalanan</p>
            <p>Keterangan</p>
          </div>
        </div>
        <div className="bg-[#2F4D6F] rounded-2xl p-6 shadow-lg w-full max-w-xl mx-auto">
  <div className="grid grid-cols-3 gap-4 items-center">
    {/* Foto Profil */}
    <div className="col-span-1">
      <img
        src="/assets/images/profile/1.jpg"
        alt="Profile"
        className="w-full h-auto rounded-lg object-cover"
      />
    </div>

    {/* Informasi Pengguna */}
    <div className="col-span-2 flex flex-col justify-center">
      <h2 className="text-white text-2xl font-bold underline">John Doe</h2>
      <p className="text-white text-lg font-semibold">08871165551</p>
      <p className="text-gray-300 text-sm mt-2">Riwayat Perjalanan</p>
      <p className="text-gray-300 text-sm">Keterangan</p>
    </div>
  </div>
</div>

        <div className="bg-fifth flex flex-row h-72 rounded-2xl">
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
        <div className="bg-fifth flex flex-row h-72 rounded-2xl">
          <div className="">
            <img
              src="\assets\images\profile\1.jpg"
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
