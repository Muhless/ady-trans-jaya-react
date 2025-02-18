import React from "react";
import { Helmet } from "react-helmet-async";

function RentPages() {
  return (
    <div>
      <Helmet>
        <title>Halaman Rental</title>
      </Helmet>
      <div className="bg-card rounded-xl h-full p-5">
        <h1 className="text-xl font-bold">Halaman Rental</h1>
      </div>
    </div>
  );
}

export default RentPages;
