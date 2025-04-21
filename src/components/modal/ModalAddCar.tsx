import React from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import ButtonComponent from "../button/Index";

type ModalAddCarProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, any>) => void;
};

const carTypes = ["pick up", "cde", "cdd", "fuso", "wingbox"];

export default function ModalAddCar({ isOpen, onClose, onSubmit }: ModalAddCarProps) {
  const { register, handleSubmit, reset } = useForm();

  if (!isOpen) return null;

  const handleFormSubmit = (data: Record<string, any>) => {
    if (!data.status) {
      data.status = "tersedia";
    }
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-text">
      <div className="bg-background p-6 rounded-md shadow-lg w-1/3">
        <div className="relative flex justify-center mb-4">
          <h1 className="font-bold underline text-lg font-compforta">Tambah Data Kendaraan</h1>
          <button onClick={onClose} className="absolute right-0 hover:text-merah">
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Nama Kendaraan</label>
            <input
              {...register("name", { required: "Nama wajib diisi" })}
              className="w-full border rounded p-2 focus:outline-blue-400"
              placeholder="Masukkan nama kendaraan"
            />
          </div>

          <div>
            <label className="block mb-1">Nomor Plat</label>
            <input
              {...register("license_plat", { required: "Plat wajib diisi" })}
              className="w-full border rounded p-2 focus:outline-blue-400"
              placeholder="Masukkan nomor plat"
            />
          </div>

          <div>
            <label className="block mb-1">Tipe</label>
            <select
              {...register("type", { required: "Tipe wajib dipilih" })}
              className="w-full border p-2 rounded-lg"
              defaultValue=""
            >
              <option value="" disabled hidden>
                Pilih tipe kendaraan
              </option>
              {carTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Harga</label>
            <input
              type="number"
              {...register("price", { required: "Harga wajib diisi" })}
              className="w-full border rounded p-2 focus:outline-blue-400"
              placeholder="Masukkan harga"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <ButtonComponent
              label="Batal"
              variant="undo"
              onClick={(e) => {
                e.preventDefault();
                reset();
                onClose();
              }}
            />
            <ButtonComponent label="Simpan" variant="save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
