import * as React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, X } from "lucide-react";
import DatePickerComponent from "./DatePicker";
import ButtonComponent from "../button/Index";

type DateRangePickerProps = {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onClear: () => void;
  className?: string;
  buttonWidth?: string;
};

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClear,
  className = "",
  buttonWidth = "w-64",
}) => {
  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      onStartDateChange(format(date, "yyyy-MM-dd"));
    } else {
      onStartDateChange("");
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    if (date) {
      onEndDateChange(format(date, "yyyy-MM-dd"));
    } else {
      onEndDateChange("");
    }
  };

  return (
    <div className={cn("flex gap-4 items-center", className)}>
      <div className="flex gap-2 items-center">
        <CalendarIcon className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Dari:</span>
        <DatePickerComponent
          selectedDate={startDate ? new Date(startDate) : undefined}
          onDateChange={handleStartDateChange}
          placeholder="Pilih tanggal"
          className="w-auto"
          showClearButton={false}
          buttonWidth={buttonWidth}
        />
      </div>

      <span className="text-gray-500">-</span>

      <div className="flex gap-2 items-center">
        <span className="text-sm font-medium text-gray-700">Sampai:</span>
        <DatePickerComponent
          selectedDate={endDate ? new Date(endDate) : undefined}
          onDateChange={handleEndDateChange}
          placeholder="Pilih tanggal"
          className="w-auto"
          showClearButton={false}
          buttonWidth={buttonWidth}
        />
      </div>

      {(startDate || endDate) && (
        <ButtonComponent variant="delete" onClick={onClear} />
      )}
    </div>
  );
};

export default DateRangePicker;