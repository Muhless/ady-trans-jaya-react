import { Divide, Plus } from "lucide-react";
import React from "react";
import useNavigationHooks from "../../hooks/useNavigation";

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
  const { goToCustomerPages } = useNavigationHooks();
  const isCustomer = label?.toLowerCase().includes("pelanggan");
  const baseClass =
    "bg-background p-2 cursor-pointer rounded-md focus:ring-biru focus:ring-2 focus:outline-none";

  return (
    <div className="flex items-center gap-5 justify-between">
      {label && <label className="text-gray-600">{label}</label>}
      <div className="flex gap-2 items-center">
        <select
          name={name}
          value={value}
          className={`${baseClass} ${isCustomer ? "w-[340px]" : "w-96"} ${
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
        {isCustomer && (
          <div className="rounded-md bg-green-400 text-white p-2 cursor-pointer">
            <Plus size={22} onClick={goToCustomerPages} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectComponent;
