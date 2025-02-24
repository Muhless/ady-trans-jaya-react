import { User2Icon } from "lucide-react";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

function AddDriverPages() {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword.length < 8) {
      setPasswordError("Password harus lebih dari 8 karakter");
    } else {
      setPasswordError("");
    }
  };
  return (
    <>
      <Helmet>
        <title>Tambah Data Driver</title>
      </Helmet>
      <div className="h-full">
        <div className="bg-card rounded-lg p-8">
          <h1 className="font-bold text-xl">Tambah Data Driver</h1>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div className="flex flex-col gap-2 mt-5 col-span-1">
                <h1>Nama</h1>
                <input
                  type="text"
                  id="nama"
                  placeholder="Nama Lengkap"
                  className="border text-gray-500 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col gap-2 mt-5 col-span-1">
                <h1>Tempat & Tanggal Lahir</h1>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="tempat-lahir"
                    placeholder="Tempat Lahir"
                    className="border text-gray-500 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-1/2"
                  />
                  <input
                    type="date"
                    id="tanggal-lahir"
                    className="border text-gray-500 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-1/2"
                  />
                </div>
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
                <textarea
                  type="text"
                  id="alamat"
                  placeholder=""
                  className="border text-gray-500 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col gap-2 mt-5 col-span-1">
                <h1>Password</h1>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="border text-gray-500 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {passwordError && (
                  <p className="text-red-500 text-sm">{passwordError}</p>
                )}
              </div>
              <div className="flex justify-end mt-5 gap-3">
                <button className="border-2 p-1 text-card rounded-lg w-36 h-10 hover:text-card bg-merah hover:bg-red-600">
                  Hapus
                </button>
                <button className="border-2 p-1 text-card rounded-lg w-36 h-10 bg-primary hover:bg-hover">
                  Simpan
                </button>
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
