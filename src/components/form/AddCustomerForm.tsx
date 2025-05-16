import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ButtonComponent from "../button/Index";

const customerSchema = z.object({
  name: z.string().min(1, "Nama pelanggan wajib diisi"),
  email: z.string().email("Email tidak valid").optional(),
  phone: z.string().min(1, "Nomor telepon wajib diisi"),
  address: z.string().min(1, "Alamat wajib diisi"),
  company: z.string().optional(),
});

export type AddCustomerFormData = z.infer<typeof customerSchema>;

type Props = {
  onSubmit: (data: AddCustomerFormData) => void;
  defaultValues?: Partial<AddCustomerFormData>;
  onReset?: () => void;
  mode?: "add" | "edit";
};

const AddCustomerForm: React.FC<Props> = ({
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
  } = useForm<AddCustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      Object.entries(defaultValues).forEach(([key, val]) => {
        setValue(key as keyof AddCustomerFormData, val ?? "");
      });
    }
  }, [defaultValues, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex flex-col gap-4"
    >
      <div>
        <label>Nama Pelanggan</label>
        <input
          {...register("name")}
          className="w-full border rounded p-2"
          placeholder="Masukkan nama pelanggan"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label>Email</label>
        <input
          {...register("email")}
          type="email"
          className="w-full border rounded p-2"
          placeholder="Masukkan email (opsional)"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label>Nomor Telepon</label>
        <input
          {...register("phone")}
          className="w-full border rounded p-2"
          placeholder="Masukkan nomor telepon"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label>Alamat</label>
        <textarea
          {...register("address")}
          className="w-full border rounded p-2"
          placeholder="Masukkan alamat lengkap"
          rows={3}
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label>Perusahaan (opsional)</label>
        <input
          {...register("company")}
          className="w-full border rounded p-2"
          placeholder="Masukkan nama perusahaan"
        />
      </div>

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

export default AddCustomerForm;
