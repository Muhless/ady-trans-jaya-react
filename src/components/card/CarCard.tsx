import React from "react";
import ButtonComponent from "../button/Index";
import Card from ".";

type CarCardProps = {
  name: string;
  type: string;
  license_plat: string;
  price: number;
  status: string;
};

const CarCard: React.FC<CarCardProps> = ({
  name,
  type,
  license_plat,
  price,
  status,
}) => {
  return (
    <Card className="py-5">
      <div className="absolute flex items-center gap-1 text-center cursor-pointer top-2 right-2">
        <ButtonComponent variant="edit" />
        <ButtonComponent variant="delete" />
      </div>
      <div className="grid grid-cols-2 items-center justify-evenly mx-10">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold tracking-wider capitalize text-4xl font- underline">
            {name}
          </h1>
          <p>{type}</p>
          <p>{license_plat}</p>
          <p>{`Rp. ${price}`}</p>
          <p
            className={`inline-block text-center py-1 rounded text-white font-semibold mt-2 ${
              status ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {status ? "Tersedia" : "Tidak tersedia"}
          </p>
        </div>
        <img
          src={`/assets/images/cars/${type.toLowerCase()}.png`}
          alt={`${type} image`}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/assets/images/cars/default.png";
          }}
          className="object-contain w-auto h-48"
        />
      </div>
    </Card>
  );
};

export default CarCard;
