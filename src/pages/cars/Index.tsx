import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import SearchInput from "../../components/Atom/Search";
import CarCard from "../../components/Molecule/CarCard";
import Modal from "../../components/Molecule/Modal";
import Title from "../../components/Atom/Title";

const carTypes = [
  "Semua",
  "Pick Up",
  "Colt Diesel Engkel",
  "Colt Double Diesel",
  "Fuso",
  "Wingbox",
];

function CarPages() {
  const [selectedType, setSelectedType] = useState("Semua");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Title title={"Kendaraan"} />
      <div className="bg-background rounded-xl">
        <div className="flex justify-between items-center">
          <div
            className="bg-biru text-primary h-9 flex items-center gap-2 px-4 rounded-lg cursor-pointer hover:bg-merah"
            onClick={() => setIsModalOpen(true)}
          >
            <h1>Tambah Kendaraan</h1>
            <PlusCircle />
          </div>
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
          <SearchInput />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-10 ">
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        carTypes={carTypes}
      />
    </>
  );
}

export default CarPages;
