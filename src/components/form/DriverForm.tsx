import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ButtonComponent from "../button/Index";
import { Eye, EyeOff } from "lucide-react";

export type DriverFormData = {
  name: string;
  phone: string;
  address: string;
  photo?: FileList | string;
  username: string;
  password: string;
  status: "tersedia" | "tidak tersedia" | string;
};

type DriverFormProps = {
  defaultValues?: Partial<DriverFormData>;
  onSubmit: (data: DriverFormData) => void;
  onReset?: () => void;
  mode?: "add" | "edit";
};

const DriverForm: React.FC<DriverFormProps> = ({
  defaultValues = {},
  onSubmit,
  onReset,
  mode = "add",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DriverFormData>();

  useEffect(() => {
    if (mode === "edit" && defaultValues) {
      Object.entries(defaultValues).forEach(([key, value]) => {
        if (key === "photo") return;
        setValue(key as keyof DriverFormData, value as any);
      });
    }
  }, [defaultValues, setValue, mode]);

  const watchedPhoto = watch("photo");

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          {/* Nama */}
          <div>
            <label className="block font-medium mb-1">Nama</label>
            <input
              type="text"
              {...register("name", { required: "Nama wajib diisi" })}
              placeholder="Masukkan nama"
              className="w-full border p-2 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Nomor Telepon */}
          <div>
            <label className="block font-medium mb-1">Nomor Telepon</label>
            <input
              type="number"
              {...register("phone", { required: "Nomor telepon wajib diisi" })}
              placeholder="Masukkan nomor telepon"
              className="w-full border p-2 rounded"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Alamat */}
          <div>
            <label className="block font-medium mb-1">Alamat</label>
            <textarea
              {...register("address", { required: "Alamat wajib diisi" })}
              rows={3}
              placeholder="Masukkan alamat"
              className="w-full border p-2 rounded"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {mode === "add" && (
            <>
              {/* username */}
              <div>
                <label className="block font-medium mb-1">Username</label>
                <input
                  type="text"
                  {...register("username", {
                    required: "Username wajib diisi",
                    validate: (value) =>
                      value.trim() !== "" || "Username tidak boleh kosong",
                  })}
                  placeholder="Masukkan username"
                  className="w-full border p-2 rounded"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* password */}
              <div>
                <label className="block font-medium mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password wajib diisi",
                    })}
                    placeholder="Masukkan password"
                    className="w-full border p-2 rounded pr-10"
                  />
                  <div
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Status */}
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

          {/*  */}

          {/* Foto */}
          <div>
            <label className="block font-medium mb-1">Foto</label>
            <input
              type="file"
              accept="image/*"
              {...register("photo")}
              className="w-full"
            />
            {watchedPhoto && watchedPhoto.length > 0 && (
              <p className="text-sm text-green-600 mt-1">
                File dipilih:{" "}
                {watchedPhoto[0] instanceof File
                  ? watchedPhoto[0].name
                  : watchedPhoto[0]}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="flex justify-end gap-2 mt-4">
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

export default DriverForm;
