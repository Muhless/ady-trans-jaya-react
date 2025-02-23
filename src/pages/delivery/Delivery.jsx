import { Ellipsis } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import DeliveryCard from "../../components/Card/DeliveryCard";
import SearchInput from "../../components/Search";

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
      <div className="bg-card rounded-xl p-5">
        <div className="flex flex-row gap-3">
          <div className="grid grid-cols-3 h-full w-full gap-3">
            <DeliveryCard />
            <DeliveryCard />
            <DeliveryCard />
          </div>
        </div>
        <div className="col-span-3 mt-5">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-black font-bold text-xl">
              Menunggu Persetujuan
            </h1>
            <SearchInput />
          </div>
          <table className="w-full mt-5 rounded-lg text-sm bg-primary">
            <thead>
              <tr className="text-card">
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
