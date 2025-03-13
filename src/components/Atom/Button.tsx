import { Edit, LucideRepeat2, MapPinPlus, Plus, Save, Trash2, Undo2 } from "lucide-react";
import React from "react";

type ButtonComponentProps = {
  label?: string;
  onClick?: () => void;
  variant?: "default" | "add" | "edit" | "delete" | "save" | "back" | "map" | 'undo';
  icon?: React.ReactNode;
  className?: string;
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  label,
  onClick,
  variant = "default",
  className
}) => {
  const baseStyle =
    "py-1 transition rounded-lg text-primary font-medium focus:outline-none flex justify-center items-center gap-2 text-sm";
  const variants = {
    default: "bg-gray-400 hover:bg-gray-500",
    add: "bg-biru hover:bg-sky-500",
    edit: "bg-kuning hover:bg-yellow-500",
    delete: "bg-merah hover:bg-red-400",
    save: "bg-biru hover:bg-sky-600",
    back: "bg-gray-400 hover:bg-gray-500",
    map: "bg-blue-500 hover:bg-blue-600",
    undo: "bg-merah hover:bg-red-400",
  };

  const icons = {
    add: <Plus size={18} />,
    edit: <Edit size={18} />,
    delete: <Trash2 size={18} />,
    save: <Save size={18} />,
    back: <Undo2 size={18} />,
    map:<MapPinPlus size={18}/>,
    undo:<LucideRepeat2 size={18}/>
  };
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick}>
      {label && <p>{label}</p>}
      {icons[variant] && <span>{icons[variant]}</span>}
    </button>
  );
};

export default ButtonComponent;
