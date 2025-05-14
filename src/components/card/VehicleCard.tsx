import React, { useState } from "react";
import ButtonComponent from "../button/Index";
import Card from ".";
import { Vehicles } from "../../features/vehicle/Index";

const VehicleCard: React.FC<Vehicles> = ({
  id,
  name,
  type,
  license_plate,
  capacity,
  rate_per_km,
  status,
  onDelete,
}) => {
  const isAvailable = status.toLowerCase() === "tersedia";

  return (
    <Card className="relative p-6 shadow-md rounded-xl">
      <div className="absolute top-2 right-2 flex gap-1">
        <ButtonComponent variant="edit" />
        <ButtonComponent variant="delete" onClick={()=> onDelete(id)}/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold capitalize tracking-wide">
            {name}
          </h2>
          <p className="text-gray-700 capitalize">{type}</p>
          <p className="text-sm text-gray-500">{license_plate}</p>
          <p className="text-sm text-gray-500">{capacity}</p>
          <p className="text-sm text-gray-700 font-medium">
            Rp. {rate_per_km.toLocaleString()} / Km
          </p>
          <span
            className={`inline-block mt-2 text-center py-1 text-sm font-semibold rounded-md text-white ${
              isAvailable ? "bg-green-600" : "bg-red-500"
            }`}
          >
            {isAvailable ? "Tersedia" : "Tidak Tersedia"}
          </span>
        </div>
        <div className="flex justify-center items-center">
          <img
            src={`/assets/images/cars/${type.toLowerCase()}.png`}
            alt={`${type} image`}
            onError={(e) =>
              ((e.currentTarget as HTMLImageElement).src =
                "/assets/images/cars/default.png")
            }
            className="object-contain h-40 w-auto"
          />
        </div>
      </div>
    </Card>
  );
};

export default VehicleCard;
