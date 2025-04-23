import React from "react";

type InputComponentProps = {
  label?: string;
  type?: "text" | "number" | "email" | "password" | "date" | "textarea";
  name?: string;
  className?: string;
  placeholder?: string;
  weightName?: string;
  weight?: string;
  unitName?: string;
  unit?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
};

const valueUnitOptions = [
  { value: "kg", label: "kg" },
  { value: "ton", label: "ton" },
  { value: "m3", label: "m3" },
  { value: "liter", label: "liter" },
];

export const InputValue: React.FC<InputComponentProps> = ({
  label,
  placeholder = "",
  disabled,
  weightName,
  weight,
  unitName,
  unit,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-5 justify-between">
      <label className="text-gray-600">{label}</label>
      <div className="flex w-96 space-x-4">
        <input
          disabled={disabled}
          name={weightName}
          value={weight}
          className="p-2 rounded-md w-96 focus:ring-biru focus:ring-2 focus:outline-none bg-background"
          placeholder={placeholder.toLowerCase()}
          onChange={onChange}
        />
        <select
          name={unitName}
          value={unit}
          className="bg-background p-2 cursor-pointer rounded-md w-20 focus:ring-biru focus:ring-2 focus:outline-none"
          onChange={onChange}
        >
          <option value="" disabled hidden>
            {/* {label} */}
          </option>
          {valueUnitOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-gray-500"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
