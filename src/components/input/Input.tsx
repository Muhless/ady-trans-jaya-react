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
  onButtonClick?: () => void; // tambah handler optional
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
  onButtonClick,
}) => {
  const [dateValue, setDateValue] = useState<string>("");

  const formatToDisplayDate = (isoDate: string): string => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatToIsoDate = (displayDate: string): string => {
    if (!displayDate) return "";
    const parts = displayDate.split("/");
    if (parts.length !== 3) return "";

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    const date = new Date(year, month, day);
    if (isNaN(date.getTime())) return "";

    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (type === "date" && value) {
      if (typeof value === "string" && value.includes("-")) {
        setDateValue(formatToDisplayDate(value));
      } else if (typeof value === "string" && value.includes("/")) {
        setDateValue(value);
      }
    }
  }, [value, type]);

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDateValue(inputValue);

    if (onChange) {
      const isoValue = formatToIsoDate(inputValue);
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: isoValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange(syntheticEvent);
    }
  };

  const validateDateInput = (input: string): boolean => {
    const regex = /^(\d{0,2})(\/)?(\d{0,2})?(\/)?(\d{0,4})?$/;
    return regex.test(input);
  };

  const handleDateKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "/",
    ];
    const isDigit = /^\d$/.test(e.key);

    if (!isDigit && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }

    if (isDigit) {
      const input = e.currentTarget.value;
      if (input.length === 2 || input.length === 5) {
        if (e.currentTarget.selectionStart === input.length) {
          setDateValue((prev) => `${prev}/`);
        }
      }
    }
  };

  const isLocationField = label?.toLowerCase().includes("lokasi");

  const inputClass = `p-2 rounded-md ${
    isLocationField ? "w-60" : "w-72"
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
        ) : type === "date" ? (
          <input
            disabled={disabled}
            type="text"
            name={name}
            value={dateValue}
            className={inputClass}
            placeholder={placeholder || "DD/MM/YYYY"}
            onChange={handleDateInputChange}
            onKeyDown={handleDateKeyDown}
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
            onClick={onButtonClick}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <MapPin size={20} />
          </button>
        )}
      </div>
    </div>
  );
};
