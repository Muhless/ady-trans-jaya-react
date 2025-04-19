import {
  Edit,
  LucideRepeat2,
  MapPinPlus,
  Plus,
  Save,
  Trash2,
  Undo2,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

type ButtonComponentProps = {
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?:
    | "default"
    | "add"
    | "edit"
    | "delete"
    | "save"
    | "back"
    | "map"
    | "undo";
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  label,
  onClick,
  variant = "default",
  className,
  type = "button",
}) => {
  const baseStyle =
    "transition focus:outline-none flex justify-center items-center gap-2 text-sm p-2";

  const roundedStyle =
    variant === "edit" || variant === "delete" ? "rounded-full" : "rounded-md";
  const variants = {
    default: "bg-gray-400 hover:bg-gray-500",
    add: "bg-biru hover:bg-sky-500 ",
    edit: "bg-kuning hover:bg-yellow-500",
    delete: "bg-merah hover:bg-red-400",
    save: "bg-biru hover:bg-sky-500",
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
    map: <MapPinPlus size={18} />,
    undo: <LucideRepeat2 size={18} />,
  };

  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (variant === "back") {
      navigate(-1);
    } else {
      onClick && onClick(e);
    }
  };
  return (
    <button
      className={`${baseStyle} ${roundedStyle} ${variants[variant]} ${className}`}
      onClick={handleClick}
      type={type}
    >
      {label && <p>{label}</p>}
      {icons[variant] && <span>{icons[variant]}</span>}
    </button>
  );
};

export default ButtonComponent;
