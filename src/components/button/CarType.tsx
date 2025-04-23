import React, { useState } from "react";

export const VehicleTypeComponent = ({ vehicleTypes }) => {
  const [selectedType, setSelectedType] = useState("Semua");

  return (
    <div className="flex justify-center gap-2">
      {vehicleTypes.map((type, index) => (
        <div
          key={index}
          className={`flex items-center justify-center ease-in-out cursor-pointer w-32 text-sm p-2 transition-all duration-300 ${
            selectedType === type
              ? "bg-kuning "
              : "bg-text text-background hover:bg-merah hover:text-text"
          }`}
          onClick={() => setSelectedType(type)}
        >
          <h1>{type}</h1>
        </div>
      ))}
    </div>
  );
};
