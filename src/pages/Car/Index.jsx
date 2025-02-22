import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import CarCard from "../../components/Card/CarCard";

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
        <title>Halaman Daftar Mobil</title>
        <meta
          name="description"
          content="Ini adalah halaman kelola data mobil"
        />
      </Helmet>
      <div className="p-5 bg-card rounded-xl">
        <h1 className="mb-5 text-2xl font-bold">Daftar Kendaraan</h1>
        <div className="flex justify-center gap-2">
          {carTypes.map((type, index) => (
            <div
              key={index}
              className={`flex items-center justify-center text-sm ease-in-out border border-black cursor-pointer w-36 h-7 rounded-xl transition-all duration-300 ${
                selectedType === type
                  ? "bg-text text-card"
                  : "bg-card text-text hover:bg-text hover:text-card"
              }`}
              onClick={() => setSelectedType(type)}
            >
              <h1>{type}</h1>
            </div>
          ))}
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
