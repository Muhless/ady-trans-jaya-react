import React, { useState } from "react";
import SearchInput from "../../components/atom/Search";
import Title from "../../components/atom/Title";
import AddButton from "../../components/atom/ButtonAdd";
import Modal from "../../components/molecule/Modal";
import ButtonComponent from "../../components/atom/Button";

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
