import React from "react";
import { Helmet } from "react-helmet-async";
import CarCard from "../../../components/Card/CarCard";
import ListCarCard from "../../../components/Card/ListCarCard";

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
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-1">
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
          </div>
          <div className="col-span-2">
            <ListCarCard />
            <ListCarCard />
            <ListCarCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default CarPages;
