import React, { useState } from "react";
import SearchInput from "../../components/input/Search";
import Title from "../../components/Title";
import CarCard from "../../components/card/CarCard";
import { CarTypeComponent } from "../../components/button/CarType";
import ButtonComponent from "../../components/button/Index";
import Modal from "../../components/Modal";

const carTypes = ["Semua", "Pick Up", "CDE", "CDD", "Fuso", "Wingbox"];

const modalInput = [
  { name: "name", label: "Nama", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "type", label: "Tipe", type: "select", options: carTypes },
  { name: "address", label: "Alamat", type: "textarea" },
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
      <div className="space-y-3">
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
      </div>
      <Modal
        title="Kendaraan"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fields={modalInput}
      />
    </>
  );
}

export default CarPages;
