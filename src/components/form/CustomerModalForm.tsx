import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ButtonComponent from "../button/Index";
import { Eye, EyeOff } from "lucide-react";

export type CustomerFormData = {
  name: string;
  company: string;
  phone: string;
  email: string;
  address: string;
};

type CustomerFormProps = {
  defaultValues?: Partial<CustomerFormData>;
  onSubmit: (data: CustomerFormData) => void;
  onReset?: () => void;
  mode?: "add" | "edit";
};

const CustomerForm: React.FC<CustomerFormProps> = ({
  defaultValues = {},
  onSubmit,
  onReset,
  mode = "add",
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CustomerFormData>();

  useEffect(() => {
    if (mode === "edit" && defaultValues) {
      Object.entries(defaultValues).forEach(([key, value]) => {
        setValue(key as keyof CustomerFormData, value as any);
      });
    }
  }, [defaultValues, setValue, mode]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Nama Lengkap</label>
          <input
            type="text"
            {...register("name", { required: "Nama lengkap wajib diisi" })}
            placeholder="Masukkan nama lengkap"
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Perusahaan/Toko</label>
          <input
            type="text"
            {...register("company")}
            placeholder="Masukkan nama perusahaan atau toko"
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email wajib diisi",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Format email tidak valid",
              },
            })}
            placeholder="Masukkan email"
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Nomor Telepon</label>
          <input
            type="tel"
            {...register("phone", {
              required: "Nomor telepon wajib diisi",
              pattern: {
                value: /^[0-9+\-\s()]+$/,
                message: "Format nomor telepon tidak valid",
              },
            })}
            placeholder="Masukkan nomor telepon"
            className="w-full border p-2 rounded"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Alamat</label>
          <textarea
            {...register("address", { required: "Alamat wajib diisi" })}
            rows={3}
            placeholder="Masukkan alamat lengkap"
            className="w-full border p-2 rounded"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <ButtonComponent
          label="Ulangi"
          className="w-28"
          variant="undo"
          onClick={(e) => {
            e.preventDefault();
            reset();
            onReset?.();
          }}
        />
        <ButtonComponent
          label="Simpan"
          className="w-28"
          variant="save"
          type="submit"
        />
      </div>
    </form>
  );
};

export default CustomerForm;
