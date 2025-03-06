import React from "react";

type InputComponentProps = {
  type?: "text" | "number" | "email" | "passord";
  onChange: (value: string) => void;
};

export const InputComponent: React.FC<InputComponentProps> = ({
  type = "text",
  onChange,
}) => {
  return (
    <>
      <input
        type={type}
        className="bg-secondary p-2 rounded-lg"
        placeholder={`Masukkan ${type}`}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
};
