import { X } from "lucide-react";
import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  carTypes?: string[];
  title?: string;
  label1?: string;
  label2?: string;
  label3?: string;
  label4?: string;
  type2?: string;
  type3?: string;
  type4?: string;
  isSelect?: boolean;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  mode?: "add" | "edit";
  dataToEdit?: object | null;
};

function Modal({
  isOpen,
  onClose,
  carTypes = [],
  title = "data",
  label1 = "label1",
  label2 = "label2",
  label3 = "label3",
  label4 = "label4",
  type2 = "text",
  type3 = "number",
  type4 = "text",
  isSelect = true,
  onSubmit,
  mode = "add",
  dataToEdit = null,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-primary">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <div className="flex justify-between">
            <h1 className="font-medium text-lg">
              {mode === "edit" ? "add" : "Tambah Data"}
            </h1>
            <button onClick={onClose} className="text-text hover:text-merah">
              <X />
            </button>
          </div>
          <form
            className="mt-4"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              onSubmit?.(e);
            }}
          >
            <label className="block mb-2">{label1}</label>
            <input
              type="text"
              className="w-full border rounded p-2 mb-4 focus:outline-blue-400"
              placeholder={`Masukkan ${label1.toLowerCase()}`}
            />
            <label className="block mb-2">{label2}</label>
            <input
              type={type2}
              className="w-full border rounded p-2 mb-4 focus:outline-blue-400"
              placeholder={`Masukkan ${label2.toLowerCase()}`}
            />
            <label className="block mb-2">{label3}</label>
            {isSelect && carTypes.length > 0 ? (
              <select className="w-full border p-2 rounded mb-4">
                {carTypes.slice(1).map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type3}
                className="w-full border rounded p-2 mb-4 focus:outline-blue-400"
                placeholder={`Masukkan ${label3.toLowerCase()}`}
              />
            )}
            <label className="block mb-2">{label4}</label>
            <input
              type={type4}
              className="w-full border rounded p-2 mb-4 focus:outline-blue-400"
              placeholder={`Masukkan ${label4.toLowerCase()}`}
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
    </>
  );
}

export default Modal;
