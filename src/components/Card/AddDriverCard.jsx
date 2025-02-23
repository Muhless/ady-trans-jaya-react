import { UserPlus2 } from "lucide-react";
import React from "react";

const AddDriverCard = () => {
  return (
    <div
      className="bg-biru text-sm flex flex-row rounded-2xl p-4 shadow-lg relative cursor-pointer 
    hover:bg-hover hover:scale-105 hover:shadow-lg hover:-translate-y-2 text-background  hover:text-white
    transition-all duration-300 ease-in-out h-full"
    >
      <div className="flex items-center justify-center w-full">
        <UserPlus2 className="size-28" />
      </div>
    </div>
  );
};

export default AddDriverCard;
