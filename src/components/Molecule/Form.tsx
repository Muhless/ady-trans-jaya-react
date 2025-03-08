import React, { useState } from "react";
import ButtonComponent from "../Atom/Button";

type Field = {
  label: string;
  type?: "text" | "password" | "email" | "number" | "date";
  placeholder?: string;
  options?: { value: string; label: string }[];
  value?: string;
  // onChange?: (value: string) => void;
};

type FormProps = {
  fields: Field[];
  onChange?: (label: string, value: string) => void;
};

const Form: React.FC<FormProps> = ({ fields, onChange }) => {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const handleChange = (label: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [label]: value }));
    if (onChange) {
      onChange(label, value);
    }
  };
  return (
    <form onSubmit={undefined} className="flex flex-col space-y-4">
      {fields.map((field, index) => (
        <div
          key={index}
          className="flex flex-row space-x-4 items-center justify-between text-sm"
        >
          <label>{field.label}</label>
          {field.type === "date" ? (
            <input
              type="date"
              className="bg-secondary p-2 focus:outline-none focus:ring-2 focus:ring-biru w-64"
              value={formValues[field.label] || ""}
              onChange={(e) => handleChange(field.label, e.target.value)}
            />
          ) : field.options ? (
            <select
              className="bg-secondary p-2 w-64 focus:outline-none focus:ring-2 focus:ring-biru"
              value={formValues[field.label] || ""}
              onChange={(e) => handleChange(field.label, e.target.value)}
            >
              <option value="">Pilih {field.label}</option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              className="bg-secondary p-2 focus:outline-none focus:ring-2 focus:ring-biru w-64"
              placeholder={field.placeholder}
              value={formValues[field.label] || ""}
              onChange={(e) => handleChange(field.label, e.target.value)}
            />
          )}
        </div>
      ))}
    </form>
  );
};

export default Form;
