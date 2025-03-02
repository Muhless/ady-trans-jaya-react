import { Trash2 } from "lucide-react";
import React from "react";

const ButtonDelete = ({ size, onClick }) => {
  return (
    <button
      className="p-2 bg-merah rounded-full text-primary hover:text-text"
      onClick={(e) => {
        e.stopPropagation;
        onClick();
      }}
    >
      <Trash2 size={size} />
    </button>
  );
};

export default ButtonDelete;
