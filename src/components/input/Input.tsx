import React from "react";

type InputComponentProps = {
  label?: string;
  type?: "text" | "number" | "email" | "password" | "date" | "textarea";
  name?: string;
  className?: string;
  placeholder?: string;
  value?: string | number | Date | null | undefined;
  disabled?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
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
}) => {
  const inputClass = `p-2 rounded-md w-72 focus:ring-biru focus:ring-2 focus:outline-none ${
    disabled ? "bg-gray-300" : "bg-background"
  } ${className}`;

  const formatValue = (
    value: string | number | Date | null | undefined
  ): string => {
    if (value === undefined || value === null) {
      return "";
    }
    if (value instanceof Date) {
      return value.toISOString().split("T")[0];
    }
    return value != null ? String(value) : "";
  };
  return (
    <div className="flex items-center gap-5 justify-between">
      <label className="text-gray-600">{label}</label>
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
          value={formatValue(value)}
          className={inputClass}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
    </div>
  );
};
