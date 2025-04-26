import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
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
  onSubmit?: (data: FormData) => void;
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
  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: dataToEdit || {},
  });

  const [fileInputs, setFileInputs] = useState<Record<string, File | null>>({});
  const [filePreview, setFilePreview] = useState<Record<string, string>>({});

  useEffect(() => {
    if (dataToEdit) {
      Object.keys(dataToEdit).forEach((key) => setValue(key, dataToEdit[key]));
    } else {
      reset();
      setFileInputs({});
      setFilePreview({});
    }
  }, [dataToEdit, setValue, reset]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFileInputs((prev) => ({ ...prev, [fieldName]: file }));

      // Create preview URL for image
      const previewUrl = URL.createObjectURL(file);
      setFilePreview((prev) => ({ ...prev, [fieldName]: previewUrl }));
    }
  };

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
          encType="multipart/form-data"
          className="mt-4"
          onSubmit={handleSubmit((formValues) => {
            // Buat FormData baru untuk mengirim semua data termasuk file
            const formData = new FormData();

            // Tambahkan semua nilai form ke FormData
            Object.entries(formValues).forEach(([key, value]) => {
              if (value !== null && value !== undefined && value !== "") {
                formData.append(key, value as string);
              }
            });

            // Tambahkan file yang diupload
            Object.entries(fileInputs).forEach(([key, file]) => {
              if (file) {
                formData.append(key, file);
              }
            });

            // Log semua data yang akan dikirim untuk debugging
            console.log("Form data yang akan dikirim:");
            for (const pair of formData.entries()) {
              console.log(
                pair[0] +
                  ": " +
                  (pair[1] instanceof File
                    ? `File: ${pair[1].name}, type: ${pair[1].type}, size: ${pair[1].size}`
                    : pair[1])
              );
            }

            // Panggil onSubmit dengan FormData
            onSubmit?.(formData);
          })}
        >
          {fields.map(({ name, label, type, options }) => (
            <div key={name} className="mb-4">
              <label className="block mb-2 font-medium">{label}</label>
              {options ? (
                <select
                  {...register(name, {
                    required: `Harap pilih ${label.toLowerCase()}`,
                  })}
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
                  placeholder={`Masukkan ${label.toLocaleLowerCase()}`}
                />
              ) : type === "file" || type === "image" ? (
                <div>
                  <input
                    type="file"
                    accept={type === "image" ? "image/*" : undefined}
                    onChange={(e) => handleFileChange(e, name)}
                    className="w-full border rounded p-2 focus:outline-blue-400"
                  />
                  {filePreview[name] && type === "image" && (
                    <div className="mt-2">
                      <img
                        src={filePreview[name]}
                        alt="Preview"
                        className="h-32 object-contain rounded border"
                      />
                    </div>
                  )}
                </div>
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
                setFileInputs({});
                setFilePreview({});
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
