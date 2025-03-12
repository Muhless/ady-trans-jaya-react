import React from "react";

type InputComponentProps = {
  label?: string;
  type?: "text" | "number" | "email" | "password";
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputComponent: React.FC<InputComponentProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-row items-center gap-5 p-2 justify-between">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        className="bg-secondary p-2 rounded-lg w-64 text-sm"
        placeholder={`Masukkan ${label?.toLowerCase()}`}
        onChange={onChange}
      />
    </div>
  );
};
