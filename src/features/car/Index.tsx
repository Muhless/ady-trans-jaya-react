import React, { useState } from "react";
import SearchInput from "../../components/atom/Search";
import Modal from "../../components/molecule/Modal";
import Title from "../../components/atom/Title";
import AddButton from "../../components/atom/ButtonAdd";
import CarCard from "../../components/molecule/CarCard";
import { CarTypeComponent } from "../../components/atom/CarType";
import ButtonComponent from "../../components/atom/Button";

const carTypes = ["Semua", "Pick Up", "CDE", "CDD", "Fuso", "Wingbox"];

const modalInput = [
  { name: "name", label: "Nama", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "type", label: "Tipe", type: "select", options: carTypes },
  { name: "address", label: "Alamat", type: "text" },
];

function CarPages() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Title title="Kendaraan" />
      <div className="flex justify-between items-center mb-5">
        <ButtonComponent
          label="Tambah Kendaraan"
          variant="add"
          className="w-48"
          onClick={() => setIsModalOpen(true)}
        />
        <CarTypeComponent carTypes={carTypes} />
        <SearchInput placeholder="kendaraan" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fields={modalInput}
      />
    </>
  );
}

export default CarPages;
