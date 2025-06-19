import useNavigationHooks from "@/hooks/useNavigation";
import { MapPin, Plus } from "lucide-react";
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
  required = false,
}) => {
  const { goToAddDeliveryItemPages } = useNavigationHooks();
  const isLocationField = label?.toLowerCase().includes("lokasi");
  const listItem = label?.toLowerCase().includes("jumlah barang");
  const isTotalWeightField = label?.toLowerCase().includes("total berat");
  const stringValue = value === null ? "" : String(value);

  const inputClass = `p-2 rounded-md ${
    isLocationField || isTotalWeightField ? "w-[245px]" : "w-72"
  } focus:ring-biru focus:ring-2 focus:outline-none ${
    disabled ? "bg-gray-200" : "bg-gray-100 "
  } ${listItem ? "w-[245px]" : ""} ${className || ""}`;

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
            required={required}
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

        {listItem && (
          <button
            type="button"
            onClick={goToAddDeliveryItemPages}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Plus size={20} />
          </button>
        )}
        {isTotalWeightField && <h1 className="p-2">Kg</h1>}
      </div>
    </div>
  );
};
