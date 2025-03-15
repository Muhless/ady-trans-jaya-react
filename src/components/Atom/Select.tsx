import React from "react";

type SelectComponentProps = {
  label?: string;
  name?: string;
  value?: string;
  options: { value: string; label: string }[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectComponent: React.FC<SelectComponentProps> = ({
  label,
  name,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="flex flex-row items-center gap-5 p-2 justify-between">
      {label && <label>{label}</label>}
      <select
        name={name}
        value={value}
        className="w-64 bg-primary p-2 text-sm rounded-lg"
        onChange={onChange}
      >
        <option value="" className="text-gray-600">Pilih {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
