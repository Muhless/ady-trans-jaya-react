import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type InputDatePickerProps = {
  label?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  value?: Date | null;  // Type 'Date | null' to handle empty values
  disabled?: boolean;
  onChange?: (date: Date | null) => void;
};

export const InputDatePicker: React.FC<InputDatePickerProps> = ({
  label,
  name,
  className,
  placeholder = "",
  value,
  disabled,
  onChange,
}) => {
  // Handle date change and call onChange with the new date value
  const handleDateChange = (date: Date | null) => {
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <div className={`flex items-center gap-5 justify-between ${className}`}>
      {label && <label className="text-gray-600">{label}</label>}
      <DatePicker
        selected={value ? new Date(value) : null}  // Handle value as Date or null
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder}
        disabled={disabled}
        className="p-2 rounded-md w-72 focus:ring-biru focus:ring-2 focus:outline-none bg-background"
      />
    </div>
  );
};

const MyForm = () => {
  // Ensure deliveryDate is of type Date | null
  const [formData, setFormData] = useState<{
    deliveryDate: Date | null;  // This allows both Date and null
  }>({
    deliveryDate: null,  // Initialize with null
  });

  // Handle change for date picker
  const handleDateChange = (date: Date | null) => {
    setFormData({ ...formData, deliveryDate: date });
  };

  return (
    <form>
      <InputDatePicker
        label="Tanggal Pengiriman"
        name="deliveryDate"
        value={formData.deliveryDate}  // Pass value from state
        onChange={handleDateChange}  // Handle date change
        placeholder="Pilih tanggal"
      />
      <div>
        <p>Tanggal Pengiriman: {formData.deliveryDate ? formData.deliveryDate.toLocaleDateString() : "Belum dipilih"}</p>
      </div>
    </form>
  );
};

export default MyForm;
