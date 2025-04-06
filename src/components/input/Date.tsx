import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateInputComponentProps = {
  label: string;
};

const DateInputComponent: React.FC<DateInputComponentProps> = ({ label }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="flex items-center gap-5 p-2 justify-between">
      <label>{label}</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        className="bg-primary p-2 w-60 text-center border border-black"
        placeholderText="dd/mm/yyyy"
        portalId="root"
      />
    </div>
  );
};

export default DateInputComponent;
