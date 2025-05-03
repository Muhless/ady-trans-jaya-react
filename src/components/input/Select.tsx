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
  const stringValue = value === null ? "" : String(value);
  return (
    <div className="flex items-center gap-5 justify-between">
      {label && <label className="text-gray-600">{label}</label>}
      <div className="flex gap-2 items-center">
        <select
          name={name}
          value={stringValue}
          className={`bg-background p-2 w-72 cursor-pointer rounded-md focus:ring-biru focus:ring-2 focus:outline-none ${className}`}
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
        {/* {isCustomer && (
          <div className="rounded-md bg-green-400 text-white p-2 cursor-pointer">
            <Plus size={22} onClick={goToCustomerPages} />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default SelectComponent;
