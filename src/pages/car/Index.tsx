import React, { useState } from "react";
import SearchInput from "../../components/Atom/Search";
import Modal from "../../components/Molecule/Modal";
import Title from "../../components/Atom/Title";
import AddButton from "../../components/Atom/ButtonAdd";
import CarCard from "../../components/Molecule/CarCard";
import { CarTypeComponent } from "../../components/Atom/CarType";

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
      <div className="bg-background rounded-xl">
        <div className="flex justify-between items-center mb-5">
          <AddButton
            onClick={() => {
              setIsModalOpen(true);
            }}
            name={"Kendaraan"}
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
