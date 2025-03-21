import { Plus } from "lucide-react";
import React from "react";

type AddButtonProps = {
  onClick?: () => void;
  name: string;
};

const AddButton: React.FC<AddButtonProps> = ({ onClick, name }) => {
  return (
    <div
      className="bg-biru text-primary p-1 w-52 justify-center flex items-center gap-2 rounded-lg cursor-pointer hover:bg-merah text-sm"
      onClick={onClick}
    >
      <h1>Tambah {name}</h1>
      <Plus size={18}/>
    </div>
  );
};

export default AddButton;
