// src/components/form/AddDriverForm.tsx

import React from "react";
import { useForm } from "react-hook-form";
import ButtonComponent from "../button/Index";

type AddDriverFormProps = {
  onSuccess?: () => void;
  onError?: (message: string) => void;
};

const AddDriverForm: React.FC<AddDriverFormProps> = ({ onSuccess, onError }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: Record<string, any>) => {
    const formData = new FormData();

    if (!data.status) {
      data.status = "tersedia";
    }

    if (!data.phone) {
      alert("Nomor telepon tidak boleh kosong");
      return;
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(data.phone)) {
      alert("Nomor telepon tidak valid");
      return;
    }

    Object.keys(data).forEach((key) => {
      if (key === "photo" && data[key]?.[0]) {
        formData.append(key, data[key][0]);
      } else if (data[key]) {
        formData.append(key, data[key]);
      }
    });

    try {
      const response = await fetch("http://localhost:8080/api/driver", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Gagal menyimpan data");
      }

      onSuccess?.();
      reset();
    } catch (error: any) {
      console.error("Gagal menyimpan driver:", error);
      onError?.(error.message || "Gagal menyimpan data");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div className="mb-4">
        <label className="block mb-1">Nama</label>
        <input
          {...register("name")}
          type="text"
          className="w-full border rounded p-2"
          placeholder="Masukkan nama"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Nomor Telepon</label>
        <input
          {...register("phone")}
          type="number"
          className="w-full border rounded p-2"
          placeholder="Masukkan nomor telepon"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Alamat</label>
        <textarea
          {...register("address")}
          className="w-full border rounded p-2"
          placeholder="Masukkan alamat"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Foto</label>
        <input
          {...register("photo")}
          type="file"
          accept="image/*"
          className="w-full border rounded p-2"
        />
      </div>

      <div className="flex justify-end gap-2">
        <ButtonComponent label="Reset" variant="undo" type="reset" />
        <ButtonComponent label="Simpan" variant="save" type="submit" />
      </div>
    </form>
  );
};

export default AddDriverForm;
