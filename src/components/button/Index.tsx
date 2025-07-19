import {
  ArrowRightIcon,
  Check,
  Edit,
  Eye,
  FileSpreadsheet,
  LucideRepeat2,
  MapPinPlus,
  Plus,
  Printer,
  RotateCcw,
  Save,
  Trash2,
  Undo2,
  X,
} from "lucide-react";
import React, { forwardRef } from "react";
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
    | "next"
    | "approve"
    | "reject"
    | "print"
    | "preview"
    | "info"
    | "csv";
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonComponentProps>(
  (
    {
      label,
      onClick,
      variant = "default",
      className = "",
      type = "button",
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const baseStyle =
      "transition focus:outline-none flex justify-center items-center gap-2 text-sm p-2 text-white rounded-md";

    const variants = {
      default: "bg-gray-600 hover:bg-gray-700",
      add: "bg-sky-600 hover:bg-sky-700 ",
      edit: "bg-yellow-500 hover:bg-yellow-600",
      delete: "bg-red-600 hover:bg-red-700",
      save: "bg-green-600 hover:bg-green-700",
      back: "bg-gray-600 hover:bg-gray-700",
      map: "bg-sky-600 hover:bg-sky-700",
      undo: "bg-red-600 hover:bg-red-700",
      next: "bg-green-600 hover:bg-green-700",
      approve: "bg-green-600 hover:bg-green-700",
      reject: "bg-red-600 hover:bg-red-700",
      print: "bg-sky-600 hover:bg-sky-700 ",
      preview: "bg-yellow-500 hover:bg-yellow-600",
      info: "bg-yellow-500 hover:bg-yellow-600",
      csv: "bg-green-600 hover:bg-green-700",
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
      approve: <Check size={18} />,
      reject: <X size={18} />,
      print: <Printer size={18} />,
      preview: <Eye size={18} />,
      info: <RotateCcw size={18} />,
      csv: <FileSpreadsheet size={18}/>
    };

    const navigate = useNavigate();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (variant === "back") {
        e.preventDefault();
        navigate(-1);
      } else {
        onClick?.(e);
      }
    };

    return (
      <button
        ref={ref}
        className={`${baseStyle} ${variants[variant]} ${className}`}
        onClick={handleClick}
        type={type}
        disabled={disabled}
        {...rest}
      >
        {label && <p>{label}</p>}
        {icons[variant] && <span>{icons[variant]}</span>}
      </button>
    );
  }
);

ButtonComponent.displayName = "ButtonComponent";
export default ButtonComponent;
