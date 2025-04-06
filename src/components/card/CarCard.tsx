import React from "react";
import ButtonComponent from "../button/Index";
import Card from ".";

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
    <Card>
      <div className="absolute flex items-center gap-1 text-center cursor-pointer top-2 right-2">
        <ButtonComponent variant="edit" />
        <ButtonComponent variant="delete" />
      </div>
      <div className="flex items-center justify-evenly flex-grow w-full col-span-2">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold tracking-wider capitalize text-4xl font-jakarta">
            Toyota Pickup
          </h1>
          <h2>Jenis Kendaraan</h2>
          <h3>Nomor Polisi</h3>
          <h4>Harga</h4>
          <AvailabilityStatus available={available} />
        </div>
        <img
          src="/assets/images/cars/truck.png"
          alt="car images"
          className="object-contain w-auto h-48"
        />
      </div>
    </Card>
  );
};

export default CarCard;
