import { X } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import ButtonComponent from "../button/Index";

type FieldConfig = {
  name: string;
  label: string;
  type: string;
  options?: string[];
};

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: Record<string, any>) => void;
  fields: FieldConfig[];
  mode?: "add" | "edit";
  onReset?: () => void;
  dataToEdit?: Record<string, any> | null;
};

function Modal({
  title,
  isOpen,
  onClose,
  onSubmit,
  fields,
  mode = "add",
  onReset,
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
    <div
      className="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-text"
      onClick={onClose}
    >
      <div
        className="bg-background p-6 rounded-md shadow-lg w-full max-w-md mx-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex justify-center">
          <h1 className="font-bold underline text-lg font-compforta">
            {mode === "edit" ? `Edit Data ${title}` : `Tambah Data ${title}`}
          </h1>
          <button
            onClick={onClose}
            className="absolute right-0 hover:text-merah"
          >
            <X />
          </button>
        </div>

        <form
          className="mt-4"
          onSubmit={handleSubmit((formValues) => {
            onSubmit?.(formValues); // kirim data JSON
          })}
        >
          {fields.map(({ name, label, type, options }) => (
            <div key={name} className="mb-4">
              <label className="block mb-2 font-medium">{label}</label>
              {options ? (
                <select
                  {...register(name, { required: `Harap pilih ${label.toLowerCase()}` })}
                  className="w-full border p-2 rounded-lg"
                >
                  <option value="" disabled hidden>
                    Pilih {label.toLowerCase()}
                  </option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : type === "textarea" ? (
                <textarea
                  {...register(name)}
                  className="w-full border rounded p-2 focus:outline-blue-400"
                  rows={4}
                  placeholder={`Masukkan ${label.toLowerCase()}`}
                />
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
      </div>
    </div>
  );
}

export default Modal;
