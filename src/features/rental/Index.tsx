import React, { useState } from "react";
import SearchInput from "../../components/input/Search";
import Title from "../../components/Title";
import Modal from "../../components/Modal";
import ButtonComponent from "../../components/button/Index";

const modalInput = [
  { name: "name", label: "Nama", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Nomor HP", type: "number" },
  { name: "address", label: "Alamat", type: "text" },
];

function RentalPages() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Title title={"Rental"} />
      <div className="flex justify-between">
        <ButtonComponent
          label="Tambah Rental"
          variant="add"
          className="w-48"
          onClick={() => setModalOpen(true)}
        />
        <SearchInput placeholder="rental" />
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        fields={modalInput}
      />
    </>
  );
}

export default RentalPages;
