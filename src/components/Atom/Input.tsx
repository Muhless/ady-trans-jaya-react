import React from "react";

type InputComponentProps = {
  label: string;
};

export const InputComponent: React.FC<InputComponentProps> = ({
  label,
}) => {
  return (
    <>
      <label className="block mb-2">{label}</label>
      <input
        type="text"
        className="w-full border rounded p-2 mb-4 focus:outline-blue-400"
        placeholder={`Masukkan ${label.toLowerCase()}`}
      />
    </>
  );
};
