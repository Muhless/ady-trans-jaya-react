import { Edit, Plus, Save, Trash2, Undo2 } from "lucide-react";
import React from "react";

type ButtonComponentProps = {
  label?: string;
  onClick?: () => void;
  variant?: "default" | "add" | "edit" | "delete" | "save" |"back";
  icon?: React.ReactNode;
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  label,
  onClick,
  variant = "default",
}) => {
  const baseStyle =
    "w-40 py-2 rounded-lg text-primary font-medium focus:outline-none flex justify-center items-center gap-2";
  const variants = {
    default: "bg-gray-400 hover:bg-gray-500",
    add: "bg-biru hover:bg-blue-500",
    edit: "bg-kuning hover:bg-yellow-500",
    delete: "bg-merah hover:bg-red-500",
    save: "bg-biru hover:bg-blue-500",
    back: "bg-gray-400 hover:bg-gray-500",
  };

  const icons = {
    add: <Plus size={18} />,
    edit: <Edit size={18} />,
    delete: <Trash2 size={18} />,
    save: <Save size={18} />,
    back: <Undo2 size={18} />,
  };
  return (
    <button className={`${baseStyle} ${variants[variant]}`} onClick={onClick}>
      {icons[variant] && <span>{icons[variant]}</span>}
      {label}
    </button>
  );
};

export default ButtonComponent;
