import React from "react";
import { Helmet } from "react-helmet-async";
import CarCard from "../../../components/Card/CarCard";
import ListCarCard from "../../../components/Card/ListCarCard";

const carTypes = [
  "Pick Up",
  "Colt Diesel Engkel",
  "Colt Double Diesel",
  "Fuso",
  "Wingbox",
];

function CarPages() {
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
        Daftar Mobil
        <div className="flex justify-center gap-3">
          {carTypes.map((type, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-8 ease-in-out border border-black cursor-pointer bg-card text-text rounded-xl w-44 hover:bg-text hover:text-card hover:transition-all hover:duration-300"
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
