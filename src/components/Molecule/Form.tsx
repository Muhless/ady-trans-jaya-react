import React from "react";

type FormProps = {
  label: string;
  type?: "text" | "password" | "email" | "number";
  options?: { value: string; label: string }[];
  // onChange?: (value: string) => void;
};

const Form: React.FC<FormProps> = ({
  label,
  type = "text",
  options,
  // onChange,
}) => {
  return (
    <div className="flex flex-col w-full space-y-1 mb-5">
      <label>{label}</label>

      {options ? (
        <select
          className="bg-secondary p-2 rounded-lg"
          // onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled selected>
            Pilih {label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        // Jika tidak ada opsi, gunakan <input>
        <input
          type={type}
          className="bg-secondary p-2 rounded-lg"
          placeholder={`Masukkan ${label}`}
          // onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default Form;
