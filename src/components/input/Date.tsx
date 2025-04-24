import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateInputComponentProps = {
  label: string;
  name: string;
  value: Date | null;
  onChange: (
    date: Date | null,
    event: React.SyntheticEvent<any> | undefined
  ) => void;
};

const DateInputComponent: React.FC<DateInputComponentProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-5 justify-between">
      <label className="text-gray-600">{label}</label>
      <DatePicker
        name={name}
        selected={value}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        className="bg-background p-2 text-center rounded-md w-96 focus:ring-biru focus:ring-2 focus:outline-none"
        placeholderText="dd/mm/yyyy"
        portalId="root"
      />
    </div>
  );
};

export default DateInputComponent;
