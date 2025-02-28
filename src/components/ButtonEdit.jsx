import { Edit } from "lucide-react";
import React, { useState } from "react";
import Modal from "./Modal";

const ButtonEdit = ({ className }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (data) => {
    setEditData(data);
    setModalOpen(true);
  };

  const handleUpdate = (formData) => {
    console.log("Data Diperbarui");
    setModalOpen(false);
  };

  return (
    <>
      <button
        className="p-2 bg-kuning rounded-full text-primary hover:text-text"
        onClick={() => handleEdit()}
      >
        <Edit className={className} />
      </button>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode="edit"
        dataToEdit={editData}
        onSubmit={handleUpdate}
      />
    </>
  );
};

export default ButtonEdit;
