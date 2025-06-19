import { Divide, Plus } from "lucide-react";
import React from "react";

type SelectComponentProps = {
  label?: string;
  placeholder?: string;
  name?: string;
  value?: string | number | null;
  className?: string;
  options: { value: string | number; label: string }[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
};

const SelectComponent: React.FC<SelectComponentProps> = ({
  label,
  name,
  placeholder,
  value,
  className,
  options,
  onChange,
  required = true,
}) => {
  const stringValue = value === null ? "" : String(value);
  return (
    <div className="flex items-center gap-5 justify-between">
      {label && <label>{label}</label>}
      <div className="flex gap-2 items-center">
        <select
          name={name}
          value={stringValue}
          required={required}
          className={`bg-blue-50 border-blue-500 p-2 w-72 cursor-pointer rounded-md focus:ring-biru focus:ring-2 focus:outline-none ${className}`}
          onChange={onChange}
        >
          <option value="" className="text-gray-500">
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectComponent;
