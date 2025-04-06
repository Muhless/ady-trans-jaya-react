import React from "react";

type InputComponentProps = {
  label?: string;
  type?: "text" | "number" | "email" | "password" | "date" | "textarea";
  name?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export const InputComponent: React.FC<InputComponentProps> = ({
  label,
  type = "text",
  name,
  placeholder = "",
  value,
  disabled,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-5 p-2 justify-between">
      <label>{label}</label>
      {type === "textarea" ? (
        <textarea
          disabled={disabled}
          name={name}
          value={value}
          className="bg-primary p-2 w-60 h-20 border border-black"
          placeholder={placeholder.toLowerCase()}
          onChange={onChange}
        />
      ) : (
        <input
          disabled={disabled}
          type={type}
          name={name}
          value={value}
          className="bg-primary p-2 w-60 border border-black"
          placeholder={placeholder.toLowerCase()}
          onChange={onChange}
        />
      )}
    </div>
  );
};
