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
    <Card>
      <div className="absolute flex items-center gap-1 text-center cursor-pointer top-2 right-2">
        <ButtonComponent variant="edit" />
        <ButtonComponent variant="delete" />
      </div>
      <div className="flex items-center justify-evenly flex-grow w-full col-span-2">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold tracking-wider capitalize text-4xl font-jakarta">
            {name}
          </h1>
          <p>{type}</p>
          <p>{license_plat}</p>
          <p>{price}</p>
          <p>{status}</p>
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
