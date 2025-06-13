import * as React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // pastikan util ini tersedia

type DatePickerComponentProps = {
  label?: string;
  selectedDate?: Date;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  label,
  selectedDate,
  onDateChange,
  placeholder = "Pilih tanggal",
  required = false,
  className = "",
}) => {
  return (
    <div className={cn("flex flex-row items-center justify-between", className)}>
      {label && (
        <label className="text-sm text-gray-600">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-72 p-2 rounded-md font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            {selectedDate
              ? format(selectedDate, "dd MMMM yyyy", { locale: id })
              : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange}
            initialFocus
            locale={id}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerComponent;
