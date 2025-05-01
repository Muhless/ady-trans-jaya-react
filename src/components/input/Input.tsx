import { MapPin } from "lucide-react";
import React, { useState, useEffect } from "react";

type InputComponentProps = {
  label?: string;
  type?: "text" | "number" | "email" | "password" | "date" | "textarea";
  name?: string;
  className?: string;
  placeholder?: string;
  value?: string | number | undefined;
  disabled?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClick?: () => void;
};

export const InputComponent: React.FC<InputComponentProps> = ({
  label,
  type = "text",
  name,
  className,
  placeholder = "",
  value,
  disabled,
  onChange,
  onClick,
}) => {
  const isLocationField = label?.toLowerCase().includes("lokasi");
  const isWeightField = label?.toLowerCase().includes("berat");

  const inputClass = `p-2 rounded-md ${
    isLocationField || isWeightField ? "w-[245px]" : "w-72"
  } focus:ring-biru focus:ring-2 focus:outline-none ${
    disabled ? "bg-gray-300" : "bg-background"
  } ${className || ""}`;

  return (
    <div className="flex items-center gap-5 justify-between">
      <label className="text-gray-600">{label}</label>
      <div className="flex items-center gap-2">
        {type === "textarea" ? (
          <textarea
            disabled={disabled}
            name={name}
            value={String(value)}
            className={`${inputClass} h-20`}
            placeholder={placeholder}
            onChange={onChange}
          />
        ) : (
          <input
            disabled={disabled}
            type={type}
            name={name}
            value={value}
            className={inputClass}
            placeholder={placeholder}
            onChange={onChange}
          />
        )}
        {isLocationField && (
          <button
            type="button"
            onClick={onClick}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <MapPin size={20} />
          </button>
        )}
        {isWeightField && <span className="text-gray-600 p-2">kg</span>}
      </div>
    </div>
  );
};
