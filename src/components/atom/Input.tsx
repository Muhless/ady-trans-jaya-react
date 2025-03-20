import React from "react";

type InputComponentProps = {
  label?: string;
  type?: "text" | "number" | "email" | "password" | "date";
  name?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputComponent: React.FC<InputComponentProps> = ({
  label,
  type = "text",
  name,
  placeholder="",
  value,
  disabled,
  onChange,
}) => {
  return (
    <div className="flex flex-row items-center gap-5 p-2 justify-between text-sm">
      <label>{label}</label>
      <input
        disabled={disabled}
        type={type}
        name={name}
        value={value}
        className="bg-primary p-2 w-60"
        placeholder={placeholder.toLowerCase()}
        onChange={onChange}
      />
    </div>
  );
};
