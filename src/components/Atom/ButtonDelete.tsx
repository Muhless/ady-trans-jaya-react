import { Trash2 } from "lucide-react";
import React from "react";

type ButtonDeleteProps = {
  size?: number;
  onClick?: () => void;
};

const ButtonDelete: React.FC<ButtonDeleteProps> = ({ size, onClick }) => {
  return (
    <button
      className="p-2 bg-merah rounded-full text-primary hover:text-text"
      onClick={(e) => {
        e.stopPropagation;
        if (onClick) {
          onClick();
        }
      }}
    >
      <Trash2 size={size} />
    </button>
  );
};

export default ButtonDelete;
