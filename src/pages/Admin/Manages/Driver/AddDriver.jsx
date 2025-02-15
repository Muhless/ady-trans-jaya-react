import { User2Icon, UserCircle } from "lucide-react";
import React from "react";
import { Helmet } from "react-helmet-async";

function AddDriverPages() {
  return (
    <>
      <Helmet>
        <title>Tambah Data Driver</title>
      </Helmet>
      <div className="w-full h-screen">
        <div className="bg-card rounded-lg p-5">
          <h1 className="font-bold text-xl">Tambah Data Driver</h1>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div className="flex flex-col gap-2 mt-5 col-span-1">
                <h1>Nama</h1>
                <input
                  type="text"
                  id="nama"
                  placeholder=""
                  className="border text-gray-500 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col gap-2 mt-5 col-span-1">
                <h1>Tempat & Tanggal Lahir</h1>
                <input
                  type="text"
                  id="ttl"
                  placeholder=""
                  className="border text-gray-500 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col gap-2 mt-5 col-span-1">
                <h1>Nomor Telepon</h1>
                <input
                  type="number"
                  id="nomor telepon"
                  placeholder=""
                  className="border text-gray-500 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col gap-2 mt-5 col-span-1">
                <h1>Alamat</h1>
                <input
                  type="text"
                  id="alamat"
                  placeholder=""
                  className="border text-gray-500 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-5 col-span-1 items-center">
              <div className="flex flex-col items-center border p-5 gap-3">
                <User2Icon className="size-40 border-4 border-black rounded-full" />
                <button className="border-2 p-1 text-card rounded-lg w-36 bg-primary hover:bg-hover">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddDriverPages;
