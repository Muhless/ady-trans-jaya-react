import { X } from "lucide-react";
import React from "react";

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  mode?: "add" | "edit";
  width?: string;
};

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  mode = "add",
  width,
}) => {
  if (!isOpen) return null;

  const renderTitle = () => {
    if (mode === "edit") return `Edit Data ${title}`;
    if (mode === "add") return `Tambah Data ${title}`;
    return title;
  };

  return (
    <div
      className="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-text"
      onClick={onClose}
    >
      <div
        className={`bg-background p-6 rounded-md shadow-lg mx-2 ${
          width ?? "w-full max-w-md"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex justify-center">
          <h1 className="font-bold underline text-lg font-compforta">
            {renderTitle()}
          </h1>
          <button
            onClick={onClose}
            className="absolute right-0 hover:text-merah"
          >
            <X />
          </button>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
