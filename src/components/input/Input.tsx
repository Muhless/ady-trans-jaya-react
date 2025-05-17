import { MapPin } from "lucide-react";
import React, { useState } from "react";

type InputComponentProps = {
  label?: string;
  type?: "text" | "number" | "email" | "password" | "date" | "textarea";
  name?: string;
  className?: string;
  placeholder?: string;
  value?: string | number | undefined | null;
  disabled?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  pointType?: "start" | "end";
  required?: boolean;
  onBlur?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  setSelectingPoint?: React.Dispatch<
    React.SetStateAction<"start" | "end" | null>
  >;
};

export const InputComponent: React.FC<InputComponentProps> = ({
  label,
  type = "text",
  name,
  className,
  placeholder = "",
  value,
  disabled = false,
  onChange,
  pointType,
  setSelectingPoint,
  required,
}) => {
  const isLocationField = label?.toLowerCase().includes("lokasi");
  const isQuantityField = label?.toLowerCase().includes("jumlah");
  const isWeightField = label?.toLowerCase().includes("berat");
  const stringValue = value === null ? "" : String(value);

  const inputClass = `p-2 rounded-md ${
    isLocationField ? "w-[245px]" : "w-72"
  } focus:ring-biru focus:ring-2 focus:outline-none ${
    disabled ? "bg-gray-300" : "bg-bg"
  } ${className || ""}`;

  return (
    <div
      className={`flex items-center ${label ? "gap-5 justify-between" : ""}`}
    >
      <label className="text-gray-600">{label}</label>
      <div className="flex items-center gap-2">
        {type === "textarea" ? (
          <textarea
            name={name}
            value={String(value)}
            className={`${inputClass} h-20`}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
            disabled={disabled}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={stringValue}
            className={inputClass}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
          />
        )}
        {isLocationField && pointType && (
          <button
            type="button"
            onClick={() => setSelectingPoint?.(pointType)}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <MapPin size={20} />
          </button>
        )}
        {/* {isQuantityField && <span className="text-gray-600 p-2">kg</span>} */}
        {/* {isWeightField && <span className="text-gray-600 p-2">kg</span>} */}
      </div>
    </div>
  );
};
