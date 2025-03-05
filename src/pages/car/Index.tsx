import React, { useState } from "react";
import SearchInput from "../../components/Atom/Search";
import Modal from "../../components/Molecule/Modal";
import Title from "../../components/Atom/Title";
import AddButton from "../../components/Atom/ButtonAdd";
import CarCard from "../../components/Molecule/CarCard";

const carTypes = [
  "Semua",
  "Pick Up",
  "Colt Diesel Engkel",
  "Colt Double Diesel",
  "Fuso",
  "Wingbox",
];

const modalInput = [
  { name: "name", label: "Nama", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "type", label: "Tipe", type: "select", options: carTypes },
  { name: "address", label: "Alamat", type: "text" },
];

function CarPages() {
  const [selectedType, setSelectedType] = useState("Semua");
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
          <div className="flex justify-center gap-2">
            {carTypes.map((type, index) => (
              <div
                key={index}
                className={`flex items-center justify-center ease-in-out cursor-pointer w-40 h-9 rounded-lg transition-all duration-300 ${
                  selectedType === type
                    ? "bg-kuning text-primary"
                    : "bg-text text-primary hover:bg-merah hover:text-primary"
                }`}
                onClick={() => setSelectedType(type)}
              >
                <h1>{type}</h1>
              </div>
            ))}
          </div>
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
