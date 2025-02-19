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
      <div className="bg-card rounded-xl p-5">
        Daftar Mobil
        <div className="flex justify-center gap-3">
          {carTypes.map((type, index) => (
            <div
              key={index}
              className="bg-card text-text h-8 flex items-center rounded-xl justify-center w-44 cursor-pointer border border-black hover:bg-text hover:text-card  hover:transition-all ease-in-out hover:duration-300"
            >
              <h1>{type}</h1>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-10">
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
