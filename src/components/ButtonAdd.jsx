import { Plus } from "lucide-react";
import React from "react";

const AddButton = ({ onClick, name }) => {
  return (
    <div
      className="bg-biru text-primary h-9 w-52 justify-center flex items-center gap-2 rounded-lg cursor-pointer hover:bg-merah"
      onClick={onClick}
    >
      <h1>Tambah {name}</h1>
      <Plus />
    </div>
  );
};

export default AddButton;
