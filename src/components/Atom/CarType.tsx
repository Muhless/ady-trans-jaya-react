import React, { useState } from "react";

export const CarTypeComponent = ({ carTypes }) => {
  const [selectedType, setSelectedType] = useState("Semua");

  return (
    <div className="flex justify-center gap-2">
      {carTypes.map((type, index) => (
        <div
          key={index}
          className={`flex items-center justify-center ease-in-out cursor-pointer w-32 text-sm p-1 rounded-lg transition-all duration-300 ${
            selectedType === type
              ? "bg-kuning text-primary"
              : "bg-text text-primary hover:bg-merah hover:text-primary"
          }`}
          onClick={() => setSelectedType(type)}
        >
          <h1>{type}</h1>
        </div>
      ))}
    </div>
  );
};
