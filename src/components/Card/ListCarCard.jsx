import React from "react";

function ListCarCard() {
  return (
    <div className="bg-card shadow-xl grid grid-cols-4 rounded-xl p-5 h-96 cursor-pointer hover:text-card hover:bg-hover hover:scale-105 ease-in-out duration-300 transition-all hover:translate-x-2">
      <div className="border col-span-1 text-xl font-bold ">
        <h1>Nama Mobil</h1>
        <h1>Plat Nomor</h1>
        <h1>Harga</h1>
        <h1>Tersedia</h1>
      </div>
      <div className="border col-span-3 flex justify-center items-center">
        <img
          src="/assets\images\cars\pickup.png"
          alt=""
          className="size- object-contain"
        />
      </div>
    </div>
  );
}

export default ListCarCard;
