import { X } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type FieldConfig = {
  name: string;
  label: string;
  type: string;
  options?: string[];
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: Record<string, any>) => void;
  fields: FieldConfig[];
  mode?: "add" | "edit";
  dataToEdit?: Record<string, any> | null;
};

function Modal({
  isOpen,
  onClose,
  onSubmit,
  fields,
  mode = "add",
  dataToEdit = null,
}: ModalProps) {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: dataToEdit || {},
  });

  useEffect(() => {
    if (dataToEdit) {
      Object.keys(dataToEdit).forEach((key) => setValue(key, dataToEdit[key]));
    } else {
      reset();
    }
  }, [dataToEdit, setValue, reset]);

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-primary">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between">
          <h1 className="font-medium text-lg">
            {mode === "edit" ? "Edit Data" : "Tambah Data"}
          </h1>
          <button onClick={onClose} className="text-text hover:text-merah">
            <X />
          </button>
        </div>

        <form
          className="mt-4"
          onSubmit={handleSubmit((data) => {
            onSubmit?.(data);
            onClose();
          })}
        >
          {fields.map(({ name, label, type, options }) => (
            <div key={name} className="mb-4">
              <label className="block mb-2">{label}</label>
              {options ? (
                <select
                  {...register(name)}
                  className="w-full border p-2 rounded-lg"
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  {...register(name)}
                  className="w-full border rounded p-2 focus:outline-blue-400"
                  placeholder={`Masukkan ${label.toLowerCase()}`}
                />
              )}
            </div>
          ))}

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
  );
}

export default Modal;
