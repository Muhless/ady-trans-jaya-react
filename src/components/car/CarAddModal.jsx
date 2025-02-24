import { X } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";
import ToastNotification from "../notification/success";

function CarAddModal({ isOpen, onClose, carTypes }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Kendaraan berhasil ditambahkan!", {
      position: "top-center",
    });
    onClose();
  };
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <div className="flex justify-between">
            <h1 className="font-medium text-lg">Tambah Kendaraan</h1>
            <button onClick={onClose} className="text-text hover:text-merah">
              <X />
            </button>
          </div>
          <form className="mt-4">
            <label className="block mb-2">Nama Kendaraan</label>
            <input
              type="text"
              className="w-full border rounded p-2 mb-4 focus:outline-blue-400"
              placeholder="Masukkan nama kendaraan"
            />
            <label className="block mb-2">Nomor Polisi Kendaraan</label>
            <input
              type="text"
              className="w-full border rounded p-2 mb-4 focus:outline-blue-400"
              placeholder="Masukkan nomor polisi kendaraan"
            />
            <label className="block mb-2">Jenis Kendaraan</label>
            <select className="w-full border p-2 rounded mb-4">
              {carTypes.slice(1).map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <label className="block mb-2">Harga</label>
            <input
              type="number"
              className="w-full border rounded p-2 mb-4 focus:outline-blue-400"
              placeholder="Masukkan harga sewa atau jasa kendaraan"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                type="button"
                className="bg-merah w-28 h-10 rounded-lg"
              >
                Batal
              </button>
              <button type="submit" className="bg-biru w-28 h-10 rounded-lg">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastNotification />
    </>
  );
}

export default CarAddModal;
