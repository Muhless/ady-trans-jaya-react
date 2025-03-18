import React from "react";
import Swal from "sweetalert2";
import ButtonDelete from "../atom/ButtonDelete";
import ButtonEdit from "../atom/ButtonEdit";

type AvailabilityStatusProps = {
  available?: string;
};

const AvailabilityStatus = ({ available }) => {
  return (
    <p className={available ? "text-green-500" : "text-red-500"}>
      {available ? "Tersedia" : "Tidak Tersedia"}
    </p>
  );
};

const CarCard: React.FC<AvailabilityStatusProps> = ({
  available = "Tersedia",
}) => {
  return (
    <div className="z-40 relative grid grid-cols-3 rounded-lg bg-secondary text-text p-4">
      <div className="absolute items-center text-center flex gap-1 cursor-pointer top-2 right-2">
        <ButtonEdit size={15} />
        <ButtonDelete size={15} />
      </div>
      <div className="flex items-center justify-center flex-grow w-full col-span-2">
        <img
          src="/assets/images/cars/truck.png"
          alt="car images"
          className="object-contain w-auto h-40"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="font-bold tracking-wider capitalize">Toyota Pickup</h1>
        <p>Jenis Kendaraan</p>
        <p>Nomor Polisi</p>
        <p>Harga</p>
        <AvailabilityStatus available={available} />
      </div>
    </div>
  );
};

export default CarCard;
