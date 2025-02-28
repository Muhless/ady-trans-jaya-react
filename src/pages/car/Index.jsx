import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import CarCard from "../../components/card/CarCard";
import SearchInput from "../../components/Search";
import AddButton from "../../components/ButtonAdd";
import Modal from "../../components/Modal";

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
      <h1 className="text-text text-4xl font-bold py-5 ">Kendaraan</h1>
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
          <SearchInput placeholder="cari kendaraan" />
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
        carTypes={carTypes}
        label1={"Nama Kendaraan"}
        label2={"Nomor Polisi Kendaraan"}
        label3={"Jenis Kendaraan"}
        label4={"Harga Sewa"}
      />
    </>
  );
}

export default CarPages;
