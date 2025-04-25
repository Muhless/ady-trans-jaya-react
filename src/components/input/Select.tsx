import React from "react";

type SelectComponentProps = {
  label?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  className?: string;
  options: { value: string; label: string }[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectComponent: React.FC<SelectComponentProps> = ({
  label,
  name,
  placeholder,
  value,
  className,
  options,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-5 justify-between">
      {label && <label className="text-gray-600">{label}</label>}
      <select
        name={name}
        value={value}
        className={`bg-background p-2 cursor-pointer rounded-md focus:ring-biru focus:ring-2 focus:outline-none ${
          className ?? "w-72"
        }`}
        onChange={onChange}
      >
        <option value="" disabled hidden className="text-gray-500">
          {placeholder}
        </option>
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
