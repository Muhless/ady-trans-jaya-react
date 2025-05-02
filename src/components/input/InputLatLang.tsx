import { MapPin } from "lucide-react";
import React from "react";

type InputLatLangProps = {
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
  pointType?: "start" | "end";

  setSelectingPoint?: React.Dispatch<
    React.SetStateAction<"start" | "end" | null>
  >;
};

export const InputLatLang: React.FC<InputLatLangProps> = ({
  label,
  type = "text",
  name,
  className,
  placeholder = "",
  value,
  disabled,
  onChange,
  pointType,
  setSelectingPoint,
}) => {
  const isLocationField = label?.toLowerCase().includes("lokasi");
  const isWeightField = label?.toLowerCase().includes("berat");

  const inputClass = `p-2 rounded-md focus:ring-biru focus:ring-2 focus:outline-none ${
    disabled ? "bg-gray-300" : "bg-background"
  } ${className || ""}`;

  return (
    <div className="flex items-center gap-5 justify-between">
      <input
        disabled={disabled}
        type={type}
        name={name}
        value={value}
        className={inputClass}
        placeholder={placeholder}
        onChange={onChange}
      />
      
    </div>
  );
};
