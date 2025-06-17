import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type InputDatePickerProps = {
  label?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  value?: Date | null;
  disabled?: boolean;
  onChange?: (date: Date | null) => void;
  required?: boolean;
};

export const InputDatePicker: React.FC<InputDatePickerProps> = ({
  label,
  name,
  className,
  placeholder = "",
  value,
  disabled,
  onChange,
  required = true,
}) => {
  const handleDateChange = (date: Date | null) => {
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <div className={`flex items-center gap-5 justify-between ${className}`}>
      {label && <label className="text-gray-600">{label}</label>}
      <DatePicker
        selected={value ? new Date(value) : null}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder}
        disabled={disabled}
        required={required}
        className="p-2 rounded-md w-72 focus:ring-biru focus:ring-2 focus:outline-none bg-bg"
      />
    </div>
  );
};

const MyForm = () => {
  const [formData, setFormData] = useState<{
    deliveryDate: Date | null;
  }>({
    deliveryDate: null,
  });

  const handleDateChange = (date: Date | null) => {
    setFormData({ ...formData, deliveryDate: date });
  };

  return (
    <form>
      <InputDatePicker
        label="Tanggal Pengiriman"
        name="deliveryDate"
        value={formData.deliveryDate}
        onChange={handleDateChange}
        placeholder="Pilih tanggal"
      />
      <div>
        <p>
          Tanggal Pengiriman:{" "}
          {formData.deliveryDate
            ? formData.deliveryDate.toLocaleDateString()
            : "Belum dipilih"}
        </p>
      </div>
    </form>
  );
};

export default MyForm;
