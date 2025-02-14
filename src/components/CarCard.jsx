import React from "react";

function CarCard() {
  return (
    <div
      className="bg-card text-text hover:text-card rounded-lg p-5 flex flex-col justify-center size-52 mt-5 cursor-pointer 
      hover:bg-hover hover:scale-105 hover:shadow-lg hover:-translate-y-2 
      transition-all duration-300 ease-in-out"
    >
      <h1 className="font-bold capitalize tracking-wider">Honda Brio</h1>
      <div className="flex flex-grow items-center justify-center w-full">
        <img
          src="/assets/images/cars/brio.png"
          alt="car images"
          className="h-32 w-auto object-contain"
        />
      </div>
      <p className="text-end">Tersedia</p>
    </div>
  );
}

export default CarCard;
