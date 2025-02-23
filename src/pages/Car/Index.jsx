import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import CarCard from "../../components/Card/CarCard";
import SearchInput from "../../components/Search";
import { Plus, PlusCircle } from "lucide-react";

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

  return (
    <>
      <Helmet>
        <title>Halaman Kendaraan</title>
        <meta
          name="description"
          content="Ini adalah halaman kelola data mobil"
        />
      </Helmet>
      <h1 className="text-text text-4xl font-bold py-5 ">Kendaraan</h1>
      <div className="bg-background rounded-xl">
        <div className="flex justify-between items-center">
          <div className="bg-biru text-primary h-9 flex items-center gap-2 px-4 rounded-lg cursor-pointer hover:bg-merah">
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
    </>
  );
}

export default CarPages;
