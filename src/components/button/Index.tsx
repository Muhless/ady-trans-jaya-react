import {
  ArrowRightIcon,
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
    | "undo"
    | "next";
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  label,
  onClick,
  variant = "default",
  className,
  type = "button",
  disabled = false,
}) => {
  const baseStyle =
    "transition focus:outline-none flex justify-center items-center gap-2 text-sm p-2 text-white";

  const roundedStyle =
    variant === "edit" || variant === "delete" ? "rounded-full" : "rounded-md";
  const variants = {
    default: "bg-gray-600 hover:bg-gray-700",
    add: "bg-blue-600 hover:bg-blue-700 ",
    edit: "bg-yellow-500 hover:bg-yellow-600",
    delete: "bg-red-600 hover:bg-red-700",
    save: "bg-green-600 hover:bg-green-700",
    back: "bg-gray-600 hover:bg-gray-700",
    map: "bg-blue-600 hover:bg-blue-700",
    undo: "bg-red-600 hover:bg-red-700",
    next: "bg-green-600 hover:bg-green-700",
  };

  const icons = {
    add: <Plus size={18} />,
    edit: <Edit size={18} />,
    delete: <Trash2 size={18} />,
    save: <Save size={18} />,
    back: <Undo2 size={18} />,
    map: <MapPinPlus size={18} />,
    undo: <LucideRepeat2 size={18} />,
    next: <ArrowRightIcon size={18} />,
  };

  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type !== "submit") {
      e.preventDefault();
    }
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
      onClick={type !== "submit" ? handleClick : undefined}
      type={type}
      disabled={disabled}
    >
      {label && <p>{label}</p>}
      {icons[variant] && <span>{icons[variant]}</span>}
    </button>
  );
};

export default ButtonComponent;
