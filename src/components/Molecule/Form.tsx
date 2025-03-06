import React from "react";

type Field = {
  label: string;
  type?: "text" | "password" | "email" | "number";
  placeholder: string;
  options?: { value: string; label: string }[];
  // onChange?: (value: string) => void;
};

type FormProps = {
  fields: Field[];
};

const Form: React.FC<FormProps> = ({ fields }) => {
  return (
    <form onSubmit={undefined} className="flex flex-col w-full space-y-1 mb-5">
      {fields.map((field, index) => (
        <div key={index} className="flex flex-col space-y-1">
          <label>{field.label}</label>
          {field.options ? (
            <select
              className="bg-secondary p-2 rounded-lg"
              // onChange={(e) => onChange(e.target.value)}
            >
              <option value="" disabled selected>
                Pilih {field.label}
              </option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              className="bg-secondary p-2 rounded-lg"
              placeholder={field.placeholder}
              // onChange={(e) => onChange(e.target.value)}
            />
          )}
        </div>
      ))}
    </form>
  );
};

export default Form;
