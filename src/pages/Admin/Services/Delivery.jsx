import { Ellipsis, Search, SearchCheck } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";

function DeliveryPages() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Pengiriman</title>
        <meta name="description" content="Ini adalah halaman utama" />
      </Helmet>
      <div className="container mx-auto">
        <div className="flex flex-row gap-3">
          <div className="grid grid-cols-3 h-full w-full">
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
          </div>
        </div>
        <div className="col-span-3 mt-5">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-black font-bold text-xl">
              Menunggu Persetujuan
            </h1>
            <div className="relative ">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <Search className="text-gray-400" />
              </span>
              <input
                type="text"
                className="pl-10 bg-primary text-gray-500 text-sm py-2 px-5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="cari data..."
              />
            </div>
          </div>
          <table className="w-full text-black mt-5 rounded-lg text-sm bg-primary">
            <thead>
              <tr>
                <th className="px-5 border-y">No</th>
                <th className="px-5 border-y">Nama</th>
                <th className="px-5 border-y">Plat Nomor</th>
                <th className="px-5 border-y">Harga</th>
                <th className="px-5 border-y">Status</th>
                <th className="px-5 border-y">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-center px-5 bg-white">
              <tr>
                <td className="border-b-4 border-b-lime-200 px-5 p-2">1</td>
                <td className="border-b-4 border-b-lime-200 px-5 p-2">cihuy</td>
                <td className="border-b-4 border-b-lime-200 px-5 p-2">cihuy</td>
                <td className="border-b-4 border-b-lime-200 px-5 p-2">cihuy</td>
                <td className="border-b-4 border-b-lime-200 px-5 p-2">
                  Menunggu Persetujuan
                </td>
                <td className="border-b-4 border-b-lime-200 px-5 p-2 relative">
                  <span
                    className="text-center items-center flex justify-center"
                    onClick={() => setOpenDropdown(!openDropdown)}
                  >
                    <Ellipsis className="cursor-pointer" />
                  </span>
                  {openDropdown && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md border z-10"
                    >
                      <ul className="text-sm text-gray-700">
                        <li
                          className="px-4 py-2 hover:bg-blue-400 hover:text-white cursor-pointer"
                          onClick={() => alert("Edit")}
                        >
                          Setujui
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-red-400 hover:text-white cursor-pointer"
                          onClick={() => alert("Delete")}
                        >
                          Tolak
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DeliveryPages;
