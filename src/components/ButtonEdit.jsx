import { Edit } from "lucide-react";
import React, { useState } from "react";
import Modal from "./Modal";

const ButtonEdit = ({ size, onClick }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        className="p-2 bg-kuning rounded-full text-primary hover:text-text"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <Edit size={size} />
      </button>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode="edit"
      />
    </>
  );
};

export default ButtonEdit;
