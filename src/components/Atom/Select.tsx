import React from "react";

export const SelectComponent = ({ label, options, onChange }) => {
  return (
    <select
      className="bg-secondary p-2 rounded-lg"
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Pilih {label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
