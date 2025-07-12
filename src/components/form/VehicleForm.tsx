import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ButtonComponent from "../button/Index";

const vehicleSchema = z.object({
  name: z.string().min(1, "Nama kendaraan wajib diisi"),
  license_plate: z.string().min(1, "Plat nomor wajib diisi"),
  type: z.string().min(1, "Jenis kendaraan wajib dipilih"),
  capacity: z.string().optional(),
  rate_per_km: z
    .union([z.string(), z.number()])
    .refine((val) => !isNaN(Number(val)), {
      message: "Harga per km harus berupa angka",
    }),
  status: z.string().optional(),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;

type Props = {
  onSubmit: (data: VehicleFormData) => void;
  defaultValues?: Partial<VehicleFormData>;
  onReset?: () => void;
  mode?: "add" | "edit";
};

const VehicleForm: React.FC<Props> = ({
  onSubmit,
  defaultValues = {},
  onReset,
  mode = "add",
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      Object.entries(defaultValues).forEach(([key, val]) => {
        setValue(key as keyof VehicleFormData, val ?? "");
      });
    }
  }, [defaultValues, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex flex-col gap-4"
    >
      <div>
        <label>Nama Kendaraan</label>
        <input
          {...register("name")}
          className="w-full border rounded p-2"
          placeholder="Masukkan nama"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label>Plat Nomor</label>
        <input
          {...register("license_plate")}
          className="w-full border rounded p-2"
          placeholder="Masukkan plat"
        />
        {errors.license_plate && (
          <p className="text-red-500 text-sm">{errors.license_plate.message}</p>
        )}
      </div>

      <div>
        <label>Jenis Kendaraan</label>
        <select {...register("type")} className="w-full border rounded p-2">
          <option value="">Pilih jenis kendaraan</option>
          <option value="pick up">Pick up</option>
          <option value="cde">CDE</option>
          <option value="cdd">CDD</option>
          <option value="fuso">Fuso</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label>Kapasitas</label>
        <input
          {...register("capacity")}
          className="w-full border rounded p-2"
          placeholder="Masukkan kapasitas"
        />
      </div>

      <div>
        <label>Harga per KM</label>
        <input
          {...register("rate_per_km")}
          className="w-full border rounded p-2"
          placeholder="Masukkan harga"
        />
        {errors.rate_per_km && (
          <p className="text-red-500 text-sm">{errors.rate_per_km.message}</p>
        )}
      </div>

      {mode === "edit" && (
        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            {...register("status", { required: "Status wajib diisi" })}
            className="w-full border p-2 rounded"
          >
            <option value="">Pilih status</option>
            <option value="tersedia">Tersedia</option>
            <option value="tidak tersedia">Tidak tersedia</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>
      )}

      <div className="flex justify-end gap-2 mt-6">
        <ButtonComponent
          label="Ulangi"
          variant="undo"
          onClick={(e) => {
            e.preventDefault();
            reset();
            onReset?.();
          }}
        />
        <ButtonComponent label="Simpan" variant="save" type="submit" />
      </div>
    </form>
  );
};

export default VehicleForm;
