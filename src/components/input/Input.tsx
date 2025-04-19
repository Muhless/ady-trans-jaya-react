import React from "react";

type InputComponentProps = {
  label?: string;
  type?: "text" | "number" | "email" | "password" | "date" | "textarea";
  name?: string;
  className?: string;
  placeholder?: string;
  value?: string;
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
  const inputClass = `p-2 rounded-md ${
    disabled ? "bg-gray-300" : "bg-background"
  } ${className}`;
  return (
    <div className="flex items-center gap-5 justify-between">
      <label>{label}</label>
      {type === "textarea" ? (
        <textarea
          disabled={disabled}
          name={name}
          value={value}
          className={`${inputClass} h-20`}
          placeholder={placeholder.toLowerCase()}
          onChange={onChange}
        />
      ) : (
        <input
          disabled={disabled}
          type={type}
          name={name}
          value={value}
          className={inputClass}
          placeholder={placeholder.toLowerCase()}
          onChange={onChange}
        />
      )}
    </div>
  );
};
