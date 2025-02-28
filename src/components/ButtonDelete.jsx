import { Trash2 } from "lucide-react";
import React from "react";

const ButtonDelete = ({className}) => {
  return (
    <button className="p-2 bg-merah rounded-full text-primary hover:text-text">
      <Trash2 className={className}/>
    </button>
  );
};

export default ButtonDelete;
