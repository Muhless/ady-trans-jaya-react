import { MapPin } from "lucide-react";
import React from "react";

type InputLatLangProps = {
  type?: "text" | "number" | "email" | "password" | "date" | "textarea";
  name?: string;
  className?: string;
  placeholder?: string;
  value?: string | number | undefined | null;
  disabled?: boolean;
  required?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  pointType?: "start" | "end";
  isSelected?: boolean;

  setSelectingPoint?: React.Dispatch<
    React.SetStateAction<"start" | "end" | null>
  >;
};

export const InputLatLang: React.FC<InputLatLangProps> = ({
  type = "number",
  name,
  className,
  placeholder = "",
  value,
  disabled,
  onChange,
  required = true,
  isSelected,
}) => {
  const stringValue = value == null ? "" : String(value);

  const inputClass = `p-2 rounded-md focus:ring-biru focus:ring-2 focus:outline-none border w-full
  ${isSelected ? "bg-blue-50 border-blue-500" : "bg-gray-300 border-gray-300"}
  ${className || ""}`;

  return (
    <div className="flex items-center gap-5 justify-between">
      <input
        disabled={disabled}
        type={type}
        name={name}
        value={stringValue}
        className={inputClass}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};
