import React from "react";
import ButtonComponent from "../atom/Button";

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
    <div className="relative z-40 grid grid-cols-3 p-4 rounded-lg bg-secondary text-text">
      <div className="absolute flex items-center gap-1 text-center cursor-pointer top-2 right-2">
        <ButtonComponent variant="edit" />
        <ButtonComponent variant="delete" />
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
