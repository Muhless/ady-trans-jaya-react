import React, { useState } from "react";
import SearchInput from "../../components/input/Search";
import Title from "../../components/Title";
import ButtonComponent from "../../components/button/Index";
import Modal from "../../components/modal/Modal";

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
        title="Rental"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        fields={modalInput}
      />
      <div className="flex justify-center">
        Kapan-kapan dikerjain
      </div>
    </>
  );
}

export default RentalPages;
